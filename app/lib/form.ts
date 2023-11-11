import {
	ValidationErrorResponseData,
	ValidatorError,
} from "remix-validated-form"

export function isTypeofFieldError(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	value: any,
): value is ValidationErrorResponseData {
	return value?.fieldErrors != null
}

export function mapFieldErrorToValidationError(
	fieldErrors: { field: string; message: string }[],
): ValidatorError {
	return fieldErrors.reduce(
		(acc, curr) => {
			acc.fieldErrors[curr.field] = curr.message
			return acc
		},
		{ fieldErrors: {} } as ValidatorError,
	)
}
