import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react"
import {
	RemixFormProvider,
	getValidatedFormData,
	useRemixForm,
} from "remix-hook-form"
import { $params, $path } from "remix-routes"
import { P, match } from "ts-pattern"
import { showShareScreen } from "~/cookies.server"
import { FreeDateForm } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import { CreateFreeDateFormValues, createFreeDateResolver } from "~/forms"
import {
	CreateFreeDateDocument,
	GetFreeDateDraftDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { getHourAndMinutes, getMinutes, mapFieldErrors, omit } from "~/lib"
import { css } from "~/styled-system/css"

export async function action({ request }: DataFunctionArgs) {
	const {
		errors,
		data: validatedData,
		receivedValues: defaultValues,
	} = await getValidatedFormData<CreateFreeDateFormValues>(
		request,
		createFreeDateResolver,
	)
	if (errors) {
		// The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
		return json({ errors, defaultValues })
	}
	const { data, errors: serverErrors } = await gqlFetch(
		request,
		CreateFreeDateDocument,
		{
			input: {
				...omit(
					validatedData,
					"tagText",
					"tags",
					"nsfw",
					"orderedStops",
					"prepText",
					"prep",
					"formError",
				),
				nsfw: validatedData.nsfw === "true",
				orderedStops: validatedData.orderedStops.map((stop, i) => ({
					...omit(stop, "id", "options"),
					optional: stop.optional === "true",
					estimatedTime: getMinutes(stop.estimatedTime),
					order: i + 1,
					options: stop.options.map((option) => ({
						...omit(option, "id"),
						location: {
							id: option.location.id,
						},
					})),
				})),
				prep:
					validatedData.prep
						?.filter((v) => v.text.length > 0)
						.map((v) => v.text) ?? [],
				tags:
					validatedData.tags
						?.filter((v) => v.text.length > 0)
						.map((t) => t.text) ?? [],
			},
		},
	)
	console.log({ data, serverErrors })
	return match(data?.createFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			json({ errors: mapFieldErrors(fieldErrors), defaultValues }),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ errors: { formError: message }, defaultValues }),
		)
		.with({ __typename: "FreeDate" }, async (date) => {
			const cookieHeader = request.headers.get("Cookie")
			const cookie = (await showShareScreen.parse(cookieHeader)) || {}
			cookie.showShareScreen = true
			return redirect($path("/free-date/:id", { id: date.id }), {
				headers: {
					"Set-Cookie": await showShareScreen.serialize(cookie),
				},
			})
		})
		.otherwise(() =>
			json({
				errors: { formError: "An unknown error occurred." },
				defaultValues,
			}),
		)
}

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { data: authData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!authData?.viewer) {
		return redirect($path("/login"))
	}
	const { id } = $params("/free-date/draft/:id", params)

	const { data } = await gqlFetch(request, GetFreeDateDraftDocument, {
		id,
	})

	return match(data?.freeDateDraft)
		.with(P.nullish, () => json({ error: "Free date not found.", draft: null }))
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message, draft: null }),
		)
		.with({ __typename: "FreeDateDraft" }, (draft) =>
			json({ draft, error: null }),
		)
		.otherwise(() => json({ error: "An unknown error occurred.", draft: null }))
}

export default function DraftRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	const methods = useRemixForm<CreateFreeDateFormValues>({
		mode: "onTouched",
		defaultValues: loaderData.draft
			? {
					draftId: loaderData.draft.id,
					formError: "",
					description: loaderData.draft.description ?? "",
					thumbnail: loaderData.draft.thumbnail ?? "",
					nsfw: loaderData.draft.nsfw ? "true" : "false",
					recommendedTime: loaderData.draft.recommendedTime ?? "6:00 PM",
					prep: loaderData.draft.prep.map((text, i) => ({
						id: i.toString(),
						text,
					})),
					prepText: "",
					tags: loaderData.draft.tags.map((t) => t),
					tagText: "",
					title: loaderData.draft.title ?? "",
					orderedStops: loaderData.draft.orderedStops.map((stop) => ({
						estimatedTime: getHourAndMinutes(stop.estimatedTime),
						id: stop.id,
						optional: stop.optional ? "true" : "false",
						order: stop.order,
						options: stop.options.map((option) => ({
							content: option.content ?? "",
							id: option.id,
							location: {
								id: option.location?.id ?? "",
								name: option.location?.name ?? "",
							},
							optionOrder: option.optionOrder,
							title: option.title ?? "",
						})),
					})),
			  }
			: {
					draftId: "",
					formError: "",
					thumbnail: "",
					description: "",
					nsfw: "false",
					recommendedTime: "6:00 PM",
					orderedStops: [
						{
							order: 1,
							optional: "false",
							estimatedTime: "1:00",
							options: [
								{
									optionOrder: 1,
									content: "",
									title: "",
									location: { id: "", name: "" },
								},
							],
						},
					],
					title: "",
					tags: [],
					prep: [],
					prepText: "",
					tagText: "",
			  },
		resolver: createFreeDateResolver,
	})
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<RemixFormProvider {...methods}>
				<Outlet />
				{loaderData.error ? (
					<p className={css({ textStyle: "error" })}>{loaderData.error}</p>
				) : (
					<FreeDateForm fetcher={fetcher} page="draft" />
				)}
			</RemixFormProvider>
		</PageContainer>
	)
}
