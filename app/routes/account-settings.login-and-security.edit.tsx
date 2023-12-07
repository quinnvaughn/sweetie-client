import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
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
	UpdatePasswordDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z
		.object({
			currentPassword: z
				.string()
				.min(6, "Password must be at least 6 characters long"),
			newPassword: z
				.string()
				.min(6, "Password must be at least 6 characters long"),
		})
		.refine(
			(data) => {
				return data.currentPassword !== data.newPassword
			},
			{
				message: "New password must be different from current password",
				path: ["newPassword"],
			},
		),
)

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return validationError(result.error)
	}

	const { currentPassword, newPassword } = result.data

	const { data } = await gqlFetch(request, UpdatePasswordDocument, {
		input: {
			currentPassword,
			newPassword,
		},
	})

	return match(data?.updatePassword)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message }, { status: 400 }),
		)
		.with({ __typename: "User" }, () =>
			redirect($path("/account-settings/login-and-security")),
		)
		.otherwise(() =>
			json({ error: "Something happened. Please try again later." }),
		)
}

export async function loader({ request }: LoaderFunctionArgs) {
	// is user logged in?
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}

	return json(
		setFormDefaults("login-and-security-form", {
			currentPassword: "",
			newPassword: "",
		}),
	)
}

export default function EditRoute() {
	return (
		<ValidatedForm
			id="login-and-security-form"
			validator={validator}
			method="post"
		>
			<Modal>
				<Modal.Header
					type="link"
					title="Edit password"
					to={$path("/account-settings/login-and-security")}
				/>
				<Modal.Body>
					<div className={css({ display: "flex", flexDirection: "column" })}>
						<div
							className={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								width: "100%",
							})}
						>
							<VStack gap={4} alignItems="flex-start" width={"100%"}>
								<Input
									type="password"
									name="currentPassword"
									label="Current Password"
									placeholder="Current Password"
									required
								/>
								<Input
									type="password"
									name="newPassword"
									label="New Password"
									placeholder="New Password"
									required
								/>
							</VStack>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer
					button={{
						text: "Save",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}
