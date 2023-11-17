import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { LogoutDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: ActionFunctionArgs) {
	const { data } = await gqlFetch(request, LogoutDocument)
	if (!data?.logout) {
		throw new Error("Logout failed")
	}
	return match(data?.logout)
		.with({ __typename: "AuthError" }, () => {})
		.with({ __typename: "Error" }, () => {
			// TODO: Add toast error.
		})
		.with({ __typename: "LogoutResult" }, async () => {
			return redirect($path("/"), {
				headers: {
					"Set-Cookie": `qid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=1; Expires=${new Date(
						"01/01/2000",
					).toUTCString()};`,
				},
			})
		})
		.otherwise(() => null)
}
