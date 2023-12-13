import { DataFunctionArgs, json } from "@remix-run/server-runtime"
import { withZod } from "@remix-validated-form/with-zod"
import { match } from "ts-pattern"
import { z } from "zod"
import {
	ToggleFavoriteDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const validator = withZod(
	z.object({
		id: z.string(),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)
	if (result.error) {
		return json({
			success: false,
			message: "Missing id",
			signup: null,
			type: null,
		})
	}

	const { data: userData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!userData?.viewer) {
		return json({ success: false, message: null, signup: true, type: null })
	}

	const id = result.data.id

	const { data } = await gqlFetch(request, ToggleFavoriteDocument, {
		input: {
			freeDateId: id,
		},
	})

	return match(data?.toggleFavorite)
		.with({ __typename: "AuthError" }, () =>
			json({ success: false, message: null, signup: true, type: null }),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ success: false, message, signup: null, type: null }),
		)
		.with({ __typename: "ToggleFavoriteResult" }, ({ type }) =>
			json({ success: true, message: null, signup: null, type }),
		)
		.otherwise(() =>
			json({
				success: false,
				message: "Unknown error",
				signup: null,
				type: null,
			}),
		)
}
