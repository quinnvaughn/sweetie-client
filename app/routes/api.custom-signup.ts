import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime"
import { withZod } from "@remix-validated-form/with-zod"
import { validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { LoginDocument, RegisterDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const registerValidator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
		name: z.string().min(1, "Must be at least 1 character"),
	}),
)

const loginValidator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const type = formData.get("type")

	return match(type)
		.with("register", async () => {
			const result = await registerValidator.validate(formData)

			if (result.error) return validationError(result.error)
			const { data, response } = await gqlFetch(request, RegisterDocument, {
				input: result.data,
			})
			if (!data) {
				return json({ success: false, message: "No data returned from server" })
			}

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
					headers.append(
						"Set-Cookie",
						response?.headers.get("Set-Cookie") ?? "",
					)
					return json(
						{ success: true, message: null },
						{
							headers,
						},
					)
				})
				.otherwise(() =>
					json({ success: false, message: "Something happened." }),
				)
		})
		.with("login", async () => {
			const result = await loginValidator.validate(formData)

			if (result.error) return validationError(result.error)
			const { data, response } = await gqlFetch(request, LoginDocument, {
				input: result.data,
			})
			if (!data) {
				return json({ success: false, message: "No data returned from server" })
			}

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
				.with({ __typename: "User" }, async () => {
					const headers = new Headers()
					headers.append(
						"Set-Cookie",
						response?.headers.get("Set-Cookie") ?? "",
					)
					return json({ success: true, message: null }, { headers })
				})
				.otherwise(() =>
					json({ success: false, message: "Something happened." }),
				)
		})
		.otherwise(() => json({ success: false, message: "Invalid type" }))
}
