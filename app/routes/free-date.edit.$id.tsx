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
import { FreeDateForm } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import {
	UpdateFreeDateFormValues,
	createFreeDateResolver,
	updateFreeDateResolver,
} from "~/forms"
import {
	GetEditFreeDateDocument,
	UpdateDateStopInput,
	UpdateFreeDateDocument,
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
	} = await getValidatedFormData<UpdateFreeDateFormValues>(
		request,
		updateFreeDateResolver,
	)
	if (errors) {
		// The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
		return json({ errors, defaultValues })
	}
	const { data } = await gqlFetch(request, UpdateFreeDateDocument, {
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
				...stop,
				optional: stop.optional === "true",
				estimatedTime: getMinutes(stop.estimatedTime),
				order: i + 1,
				options: stop.options.map((option, j) => ({
					...option,
					location: {
						id: option.location.id,
					},
				})),
			})),
			prep:
				validatedData.prep
					?.filter((v) => v.text.length > 0)
					.map((v) => v.text) ?? [],
			tags: validatedData.tags?.filter((v) => v.text.length > 0) ?? [],
		},
	})
	return match(data?.updateFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			return json({ errors: mapFieldErrors(fieldErrors), defaultValues })
		})
		.with({ __typename: "Error" }, ({ message }) =>
			json({ errors: { formError: message }, defaultValues }),
		)
		.with({ __typename: "FreeDate" }, async (date) => {
			return redirect($path("/free-date/:id", { id: date.id }))
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
	const { id } = $params("/free-date/edit/:id", params)

	const { data } = await gqlFetch(request, GetEditFreeDateDocument, {
		id,
	})

	return match(data?.getEditFreeDate)
		.with(P.nullish, () =>
			json({ error: "Free date not found.", freeDate: null }),
		)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message, freeDate: null }),
		)
		.with({ __typename: "FreeDate" }, (freeDate) =>
			json({
				error: "",
				freeDate,
			}),
		)
		.otherwise(() => json({ error: "Something went wrong.", freeDate: null }))
}

export default function EditFreeDateRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	const methods = useRemixForm<UpdateFreeDateFormValues>({
		mode: "onTouched",
		defaultValues: loaderData.freeDate
			? {
					formError: "",
					description: loaderData.freeDate.description,
					thumbnail: loaderData.freeDate.thumbnail,
					nsfw: loaderData.freeDate.nsfw ? "true" : "false",
					recommendedTime: loaderData.freeDate.recommendedTime,
					id: loaderData.freeDate.id,
					prep: loaderData.freeDate.prep.map((text, i) => ({
						id: i.toString(),
						text,
					})),
					prepText: "",
					tags: loaderData.freeDate.tags.map((t) => t),
					tagText: "",
					title: loaderData.freeDate.title,
					orderedStops: loaderData.freeDate.orderedStops.map((stop) => ({
						estimatedTime: stop.estimatedTimeHoursMinutes,
						id: stop.id,
						optional: stop.optional ? "true" : "false",
						order: stop.order,
						options: stop.options.map((option) => ({
							content: option.content,
							id: option.id,
							location: {
								id: option.location.id,
								name: option.location.name,
							},
							optionOrder: option.optionOrder,
							title: option.title,
						})),
					})),
			  }
			: {
					id: "",
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
		resolver: updateFreeDateResolver,
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
					<FreeDateForm fetcher={fetcher} page="edit" />
				)}
			</RemixFormProvider>
		</PageContainer>
	)
}
