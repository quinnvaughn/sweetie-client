import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime"
import { match } from "ts-pattern"
import { LoginWithGoogleDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const code = formData.get("code") as string
	if (!code) {
		return json({ error: "Missing code" })
	}
	const { data, response } = await gqlFetch(request, LoginWithGoogleDocument, {
		input: {
			code,
		},
	})
	return match(data?.loginWithGoogle)
		.with({ __typename: "Error" }, ({ message }) => {
			return json({ error: message })
		})
		.with({ __typename: "User" }, async () => {
			const headers = new Headers()
			headers.append("Set-Cookie", response?.headers.get("Set-Cookie") ?? "")
			return redirect((formData.get("redirectTo") as string) ?? "/", {
				headers,
			})
		})
		.otherwise(() => json({ error: "Unknown error" }))
}
