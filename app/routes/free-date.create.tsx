import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { $path } from "remix-routes"
import { setFormDefaults, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
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
				...omit(stop, "location"),
				order: i + 1,
				locationId: stop.location.id,
			})),
			tags: result.data.tags ?? [],
		},
	})
	return match(data?.createDateExperience)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with({ __typename: "DateExperience" }, ({ id }) =>
			redirect($path("/free-date/:id", { id })),
		)
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
			timesOfDay: ["morning", "afternoon", "evening"],
			title: "",
			tags: [],
			tagText: "",
		}),
	)
}

export default function CreateFreeDateRoute() {
	const actionData = useActionData<typeof action>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<FreeDateForm
				formId="create-free-date-form"
				page="create"
				error={!isTypeofFieldError(actionData) ? actionData?.error ?? "" : ""}
			/>
		</PageContainer>
	)
}
