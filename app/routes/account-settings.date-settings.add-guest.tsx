import { useFetcher, useLoaderData, useLocation } from "@remix-run/react"
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import {
	ValidatedForm,
	setFormDefaults,
	validationError,
} from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Input, Modal } from "~/features/ui"
import {
	SetDefaultGuestDocument,
	ViewerHasDefaultGuestDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError } from "~/lib"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		name: z.string().min(1, "Must be at least 1 character"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}

	const { email, name } = result.data

	const { data } = await gqlFetch(request, SetDefaultGuestDocument, {
		input: {
			email,
			name,
		},
	})

	return match(data?.setDefaultGuest)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message, success: false }),
		)
		.with({ __typename: "DefaultGuest" }, () =>
			redirect($path("/account-settings/date-settings")),
		)
		.otherwise(() =>
			json({ success: false, error: "An unknown error occurred" }),
		)
}

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, ViewerHasDefaultGuestDocument)
	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return json({ defaultGuest: data.viewer.defaultGuest })
}

export default function AddGuestRoute() {
	const { state } = useLocation()
	const fetcher = useFetcher<typeof action>()
	const { defaultGuest } = useLoaderData<typeof loader>()
	return (
		<ValidatedForm
			method="post"
			fetcher={fetcher}
			validator={validator}
			defaultValues={{
				email: state?.email ?? defaultGuest?.email ?? "",
				name: state?.name ?? defaultGuest?.name ?? "",
			}}
		>
			<Modal>
				<Modal.Header
					title={defaultGuest ? "Update default guest" : "Add a default guest"}
					type="link"
					to={$path("/account-settings/date-settings")}
				/>
				<Modal.Body>
					<VStack gap={4}>
						<Input
							name="email"
							label="Email"
							placeholder="Guest's email"
							required
						/>
						<Input name="name" label="Name" placeholder="Guest's name" />
					</VStack>
				</Modal.Body>
				<Modal.Footer
					button={{
						text: defaultGuest ? "Update" : "Add",
						disabled: fetcher.state === "submitting",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}
