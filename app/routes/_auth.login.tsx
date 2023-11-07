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
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())

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
			return redirect("/", {
				headers: {
					"Set-Cookie": response?.headers.get("Set-Cookie") ?? "",
				},
			})
		})
		.otherwise(() => null)
}

export default function LoginPage() {
	return (
		<ValidatedForm validator={validator} method="post">
			<VStack gap="4" alignItems={"center"}>
				<p className={css({ fontSize: 32 })}>Login</p>
				<Input
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
				<SubmitButton />
				<Link to={$path("/forgot-password")}>Forgot password?</Link>
				<Link to={$path("/register")}>Register</Link>
			</VStack>
		</ValidatedForm>
	)
}
