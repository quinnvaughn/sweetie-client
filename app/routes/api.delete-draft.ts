import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { DeleteFreeDateDraftDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: DataFunctionArgs) {
	const url = new URL(request.url)
	const id = url.searchParams.get("id")

	if (!id) {
		return new Response("Missing id", { status: 400 })
	}

	const { data } = await gqlFetch(request, DeleteFreeDateDraftDocument, {
		input: {
			id,
		},
	})

	return match(data?.deleteFreeDateDraft)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message, draft: null }),
		)
		.with({ __typename: "DateExperienceDraft" }, (draft) =>
			json({ error: null, draft }),
		)
		.otherwise(() => null)
}
