import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { SaveFreeDateDraftDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError, omit } from "~/lib"

export const schema = z.object({
	id: z.string().optional(),
	thumbnail: z.string().optional(),
	nsfw: z.union([z.literal("true"), z.literal("false")]).optional(),
	prepText: z.string().optional(),
	prep: zfd.repeatableOfType(z.string()).optional(),
	tagText: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	recommendedTime: z.string().optional(),
	tags: zfd.repeatableOfType(z.string()).optional(),
	stops: z
		.array(
			z.object({
				title: z.string().optional(),
				content: z.string().optional(),
				location: z
					.object({
						id: z.string().optional(),
						name: z.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
})

const validator = withZod(schema)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}

	const { data } = await gqlFetch(request, SaveFreeDateDraftDocument, {
		input: {
			...omit(
				result.data,
				"nsfw",
				"stops",
				"tagText",
				"prepText",
				"tags",
				"prep",
			),
			nsfw: result.data.nsfw === "true",
			prep: result.data.prep?.filter((v) => v.length > 0) ?? [],
			tags: result.data.tags?.filter((v) => v.length > 0) ?? [],
			stops:
				result.data.stops?.map((stop, i) => ({
					...omit(stop, "location"),
					order: i + 1,
					location: {
						id: stop.location?.id,
						name: stop.location?.name,
					},
				})) ?? [],
		},
	})

	return match(data?.saveFreeDateDraft)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with({ __typename: "FreeDateDraft" }, () =>
			redirect($path("/tastemaker/free-dates/drafts")),
		)
		.otherwise(() => json({ error: "Unknown error" }))
}
