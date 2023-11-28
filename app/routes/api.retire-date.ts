import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import {
	RetireFreeDateDocument,
	UnretireFreeDateDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	if (!formData.has("id") || !formData.has("type")) {
		return null
	}

	const id = formData.get("id") as string
	const type = formData.get("type") as "retire" | "unretire"

	return match(type)
		.with("retire", async () => {
			const { data } = await gqlFetch(request, RetireFreeDateDocument, {
				input: {
					id,
				},
			})
			return match(data?.retireFreeDate)
				.with({ __typename: "AuthError" }, () => redirect($path("/login")))
				.with({ __typename: "Error" }, ({ message }) =>
					json({ error: message, data: null }),
				)
				.with({ __typename: "FreeDate" }, ({ title }) =>
					json({ error: null, data: title }),
				)
				.otherwise(() => json({ error: "Unknown error", data: null }))
		})
		.with("unretire", async () => {
			const { data } = await gqlFetch(request, UnretireFreeDateDocument, {
				input: {
					id,
				},
			})

			return match(data?.unretireFreeDate)
				.with({ __typename: "AuthError" }, () => redirect($path("/login")))
				.with({ __typename: "Error" }, ({ message }) =>
					json({ error: message, data: null }),
				)
				.with({ __typename: "FreeDate" }, ({ title }) =>
					json({ error: null, data: title }),
				)
				.otherwise(() => json({ error: "Unknown error", data: null }))
		})
		.exhaustive()
}
