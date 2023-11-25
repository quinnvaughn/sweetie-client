import { DataFunctionArgs, redirect } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Input, SubmitButton } from "~/features/ui"
import { LoginDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)

	if (result.error) return validationError(result.error)
	const { data, response } = await gqlFetch(request, LoginDocument, {
		input: result.data,
	})
	if (!data) throw new Error("No data returned from server")

	return match(data.login)
		.with({ __typename: "AlreadyLoggedInError" }, () => {
			return redirect("/")
		})
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			return validationError({
				fieldErrors: fieldErrors.reduce(
					(acc, { field, message }) => ({
						acc,
						[field]: message,
					}),
					{},
				),
			})
		})
		.with({ __typename: "User" }, () => {
			console.log({ headers: response?.headers })
			if (formData.get("redirectTo")) {
				return redirect(formData.get("redirectTo") as string, {
					headers: {
						"Set-Cookie": response?.headers.get("Set-Cookie") ?? "",
					},
				})
			} else {
				return redirect("/", {
					headers: {
						"Set-Cookie": response?.headers.get("Set-Cookie") ?? "",
					},
				})
			}
		})
		.otherwise(() => null)
}

export default function LoginRoute() {
	return (
		<ValidatedForm validator={validator} method="post">
			<VStack gap="4" alignItems={"center"}>
				<h1 className={css({ textStyle: "h1" })}>Login</h1>
				<Input
					type="email"
					label="Email"
					required
					name="email"
					placeholder="Please enter your email"
				/>
				<Input
					label="Password"
					required
					name="password"
					placeholder="Please enter your password"
					type={"password"}
				/>
				<SubmitButton label="Login" />
				<Link
					to={$path("/forgot-password")}
					className={css({
						color: "secondary",
						fontWeight: "400",
						fontSize: "14px",
						_hover: {
							textDecoration: "underline",
						},
					})}
				>
					Forgot password?
				</Link>
				<Link
					className={css({
						cursor: "pointer",
						textDecoration: "underline",
						fontWeight: "bold",
					})}
					type="button"
					to={$path("/register")}
				>
					Register
				</Link>
			</VStack>
		</ValidatedForm>
	)
}
