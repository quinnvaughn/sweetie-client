import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { Outlet, useActionData, useFetcher } from "@remix-run/react"
import { $path } from "remix-routes"
import { setFormDefaults, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { showShareScreen } from "~/cookies.server"
import {
	FreeDateForm,
	FreeDateFormValues,
	freeDateValidator,
} from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import {
	CreateFreeDateDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { isTypeofFieldError, mapFieldErrorToValidationError, omit } from "~/lib"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await freeDateValidator.validate(formData)
	if (result.error) {
		return validationError(result.error)
	}
	const { data } = await gqlFetch(request, CreateFreeDateDocument, {
		input: {
			...omit(result.data, "tagText", "tags", "nsfw", "stops"),
			nsfw: result.data.nsfw === "true",
			stops: result.data.stops.map((stop, i) => ({
				...stop,
				order: i + 1,
			})),
			tags: result.data.tags?.filter((v) => v.length > 0) ?? [],
		},
	})
	return match(data?.createFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
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
		.otherwise(() => json({ error: "Unknown error." }))
}

export async function loader({ request }: LoaderFunctionArgs) {
	// check if user is logged in
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}

	return json(
		setFormDefaults<FreeDateFormValues>("create-free-date-form", {
			thumbnail: "",
			description: "",
			nsfw: "false",
			stops: [{ content: "", title: "", location: { id: "", name: "" } }],
			title: "",
			tags: [],
			tagText: "",
		}),
	)
}

export default function CreateFreeDateRoute() {
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<Outlet />
			<FreeDateForm
				fetcher={fetcher}
				formId="create-free-date-form"
				page="create"
				error={
					!isTypeofFieldError(fetcher.data) ? fetcher.data?.error ?? "" : ""
				}
				locationPath={$path("/free-date/create/add-location")}
			/>
		</PageContainer>
	)
}
