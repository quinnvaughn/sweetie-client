import { DataFunctionArgs, json } from "@remix-run/server-runtime"
import { validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { helpFindingADateValidator } from "~/features/free-date"
import { HelpFindingADateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError } from "~/lib"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await helpFindingADateValidator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}
	const { data } = await gqlFetch(request, HelpFindingADateDocument, {
		input: result.data,
	})

	return match(data?.helpFindingADate)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "HelpFindingADateResult" }, () =>
			json({ message: null, success: true }),
		)
		.otherwise(() => json({ message: "Something went wrong", success: false }))
}
