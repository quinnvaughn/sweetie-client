import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { Outlet, useFetcher } from "@remix-run/react"
import {
	RemixFormProvider,
	getValidatedFormData,
	useRemixForm,
} from "remix-hook-form"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { showShareScreen } from "~/cookies.server"
import { FreeDateForm } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import { CreateFreeDateFormValues, createFreeDateResolver } from "~/forms"
import {
	CreateFreeDateDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { getMinutes, mapFieldErrors, omit } from "~/lib"

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
	const { data } = await gqlFetch(request, CreateFreeDateDocument, {
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
			orderedStops: validatedData.orderedStops.map((stop) => ({
				...stop,
				optional: stop.optional === "true",
				estimatedTime: getMinutes(stop.estimatedTime),
				order: stop.order,
				options: stop.options.map((option) => ({
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
			tags:
				validatedData.tags
					?.filter((v) => v.text.length > 0)
					.map((t) => t.text) ?? [],
		},
	})
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

export async function loader({ request }: LoaderFunctionArgs) {
	// check if user is logged in
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return null
}

export default function CreateFreeDateRoute() {
	const fetcher = useFetcher<typeof action>()
	const methods = useRemixForm<CreateFreeDateFormValues>({
		mode: "onTouched",
		defaultValues: {
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
				<FreeDateForm fetcher={fetcher} page="create" />
			</RemixFormProvider>
		</PageContainer>
	)
}
