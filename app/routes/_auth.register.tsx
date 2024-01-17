import { DataFunctionArgs, redirect } from "@remix-run/node"
import { Link, useFetcher, useLocation } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { LoginWithGoogleButton } from "~/features/auth"
import { Button, Input } from "~/features/ui"
import { RegisterDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
		name: z.string().min(1, "Must be at least 1 character"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)

	if (result.error) return validationError(result.error)
	const { data, response } = await gqlFetch(request, RegisterDocument, {
		input: result.data,
	})
	if (!data) throw new Error("No data returned from server")

	return match(data.register)
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
		.with({ __typename: "User" }, async () => {
			const headers = new Headers()
			headers.append("Set-Cookie", response?.headers.get("Set-Cookie") ?? "")
			return redirect((formData.get("redirectTo") as string) ?? "/", {
				headers,
			})
		})
		.otherwise(() => null)
}

export default function RegisterRoute() {
	const { state } = useLocation()
	const fetcher = useFetcher<typeof action>()
	return (
		<ValidatedForm
			fetcher={fetcher}
			validator={validator}
			method="post"
			defaultValues={{ email: state?.email ?? "", name: "", password: "" }}
		>
			<VStack gap="4" alignItems={"center"}>
				<h1 className={css({ textStyle: "h1" })}>Register</h1>
				<p className={css({ textStyle: "paragraph", textAlign: "center" })}>
					Embark on a personalized dating adventure – register now for exclusive
					perks and a touch of magic!
				</p>
				<LoginWithGoogleButton type="register" />
				<p className={css({ textStyle: "paragraph" })}>or</p>
				<Input type="email" label="Email" required name="email" />
				<Input label="Password" required name="password" type={"password"} />
				<Input label="Full name" required name="name" />
				<Button
					type="submit"
					size={"xl"}
					disabled={fetcher.state === "submitting"}
				>
					Register
				</Button>
				<Link
					className={css({
						cursor: "pointer",
						textDecoration: "underline",
						fontWeight: "bold",
					})}
					type="button"
					to={$path("/login")}
				>
					Already registered?
				</Link>
			</VStack>
		</ValidatedForm>
	)
}
