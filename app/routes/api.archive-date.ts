import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import {
	ArchiveFreeDateDocument,
	RestoreFreeDateDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	if (!formData.has("id") || !formData.has("type")) {
		return null
	}

	const id = formData.get("id") as string
	const type = formData.get("type") as "archive" | "restore"

	return match(type)
		.with("archive", async () => {
			const { data } = await gqlFetch(request, ArchiveFreeDateDocument, {
				input: {
					id,
				},
			})
			return match(data?.archiveFreeDate)
				.with({ __typename: "AuthError" }, () => redirect($path("/login")))
				.with({ __typename: "Error" }, ({ message }) =>
					json({ error: message, data: null }),
				)
				.with({ __typename: "FreeDate" }, ({ title }) =>
					json({ error: null, data: title }),
				)
				.otherwise(() => json({ error: "Unknown error", data: null }))
		})
		.with("restore", async () => {
			const { data } = await gqlFetch(request, RestoreFreeDateDocument, {
				input: {
					id,
				},
			})

			return match(data?.restoreFreeDate)
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
