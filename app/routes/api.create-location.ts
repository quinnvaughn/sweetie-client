import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { CreateLocationDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError, omit } from "~/lib"

export const createLocationValidator = withZod(
	z.object({
		redirectTo: z.string(),
		name: z
			.string()
			.min(1, "Name must be at least one character.")
			.max(1000, "Name must be no more than 1000 characters."),
		website: z.union([
			z.literal(""),
			z.string().trim().url("Must be a valid URL."),
		]),
		address: z.object({
			street: z.string().min(1, "Must be a valid street"),
			city: z
				.string({ invalid_type_error: "Must be a valid city" })
				.min(1, "Must be a valid city"),
			cityText: z.string().min(1, "Must be a valid city"),
			state: z
				.string()
				.min(2, "Must be a valid state")
				.max(2, "Must be a valid state"),
			postalCode: z.string().length(5, "Must be a valid postal code"),
		}),
		type: z.enum(["create", "search"]),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()

	const result = await createLocationValidator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}

	const input = {
		name: result.data.name,
		website: result.data.website,
		address: {
			street: result.data.address.street,
			city: result.data.address.city,
			state: result.data.address.state,
			postalCode: result.data.address.postalCode,
		},
		type: result.data.type,
	}

	const { data } = await gqlFetch(request, CreateLocationDocument, {
		input,
	})

	return match(data?.createLocation)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Location" }, () => redirect(result.data.redirectTo))
		.otherwise(() => json({ error: "Unknown error" }))
}
