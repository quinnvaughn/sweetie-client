import { zodResolver } from "@hookform/resolvers/zod"
import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { getValidatedFormData } from "remix-hook-form"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { z } from "zod"
import { CreateLocationDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrors } from "~/lib"

const addLocationSchema = z.object({
	status: z.enum(["search", "create"]),
	website: z.string().url("Website must be a valid URL."),
	name: z.string(),
	address: z.object({
		postalCode: z.string(),
		city: z.string(),
		state: z.string(),
		street: z.string(),
	}),
})

export type AddLocationValues = z.infer<typeof addLocationSchema>

export const addLocationResolver = zodResolver(addLocationSchema)

export async function action({ request }: DataFunctionArgs) {
	const {
		errors,
		data: validatedData,
		receivedValues: defaultValues,
	} = await getValidatedFormData<AddLocationValues>(
		request,
		addLocationResolver,
	)
	if (errors) {
		// The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
		return json({ errors, defaultValues })
	}

	const input = {
		name: validatedData.name,
		website: validatedData.website,
		address: {
			street: validatedData.address.street,
			city: validatedData.address.city,
			state: validatedData.address.state,
			postalCode: validatedData.address.postalCode,
		},
		type: validatedData.status,
	}

	const { data } = await gqlFetch(request, CreateLocationDocument, {
		input,
	})

	return match(data?.createLocation)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) =>
			json({
				error: message,
				defaultValues,
				type: "error",
				id: null,
				name: null,
			}),
		)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			const errors = mapFieldErrors(fieldErrors)
			return json({
				errors,
				defaultValues,
				type: "fieldErrors",
				id: null,
				name: null,
			})
		})
		.with({ __typename: "Location" }, ({ id, name }) =>
			json({ id, name, error: null, type: "success" }),
		)
		.otherwise(() =>
			json({
				error: "Unknown error",
				defaultValues,
				type: "error",
				id: null,
				name: null,
			}),
		)
}
