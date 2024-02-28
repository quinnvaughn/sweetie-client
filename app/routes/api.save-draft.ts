import { zodResolver } from "@hookform/resolvers/zod"
import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { getValidatedFormData } from "remix-hook-form"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { z } from "zod"
import { SaveFreeDateDraftDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { getMinutes, mapFieldErrors, omit } from "~/lib"

export const schema = z.object({
	draftId: z.string().optional(),
	thumbnail: z.string().optional(),
	nsfw: z.boolean(),
	prep: z.array(z.object({ id: z.string(), text: z.string() })),
	tags: z.array(z.object({ id: z.string(), text: z.string() })),
	title: z.string().optional(),
	description: z.string().optional(),
	recommendedTime: z.string(),
	orderedStops: z
		.array(
			z.object({
				id: z.string().optional(),
				order: z.number().min(1, "Order must be at least 1."),
				optional: z.enum(["true", "false"]),
				options: z.array(
					z.object({
						id: z.string().optional(),
						title: z.string().optional(),
						content: z.string().optional(),
						optionOrder: z.number().min(1, "Option order must be at least 1."),
						location: z.object({
							id: z.string().optional(),
						}),
					}),
				),
				estimatedTime: z.string(),
			}),
		)
		.min(1, "Must have at least one ordered date stop."),
})

type FormData = z.infer<typeof schema>

const resolver = zodResolver(schema)

export async function action({ request }: DataFunctionArgs) {
	const {
		errors,
		data: validatedData,
		receivedValues: defaultValues,
	} = await getValidatedFormData<FormData>(request, resolver)
	if (errors) {
		// The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
		return json({ errors, defaultValues })
	}

	const { data, errors: serverErrors } = await gqlFetch(
		request,
		SaveFreeDateDraftDocument,
		{
			input: {
				...omit(validatedData, "nsfw", "orderedStops", "tags", "prep"),
				nsfw: validatedData.nsfw,
				prep:
					validatedData.prep
						?.filter((v) => v.text.length > 0)
						.map((v) => v.text) ?? [],
				tags:
					validatedData.tags
						?.filter((v) => v.text.length > 0)
						.map((v) => v.text) ?? [],
				orderedStops:
					validatedData.orderedStops?.map((stop) => ({
						estimatedTime: getMinutes(stop.estimatedTime),
						optional: stop.optional === "true",
						order: stop.order,
						options: stop.options.map((option) => ({
							...option,
							location: {
								id: option.location.id,
							},
						})),
					})) ?? [],
			},
		},
	)

	return match(data?.saveFreeDateDraft)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			json({ errors: mapFieldErrors(fieldErrors), defaultValues }),
		)
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with({ __typename: "FreeDateDraft" }, () =>
			redirect($path("/tastemaker/free-dates/drafts")),
		)
		.otherwise(() => json({ error: "Unknown error" }))
}
