import { DataFunctionArgs } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { z } from "zod"
import { TrackDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const schema = z.object({
	event: z.string(),
	properties: z.string(),
})

const validator = withZod(schema)

export async function action({ request }: DataFunctionArgs) {
	// send info to backend to track mixpanel event
	const formData = await request.formData()
	const result = await validator.validate(formData)
	if (result.error) return null
	const { event, properties } = result.data
	await gqlFetch(request, TrackDocument, {
		input: {
			event,
			properties: JSON.parse(properties),
		},
	})

	return null
}
