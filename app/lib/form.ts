import { FieldErrors, FieldValues } from "react-hook-form"
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

export function mapFieldErrors<T extends FieldValues>(
	fieldErrors: { field: string; message: string }[],
): FieldErrors<T> {
	return fieldErrors.reduce((acc, curr) => {
		// @ts-expect-error
		acc[curr.field] = {
			type: "server",
			message: curr.message,
		}
		return acc
	}, {} as Partial<FieldErrors<T>>)
}

export function isTypeofReactFieldError(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	value: any,
): value is FieldErrors {
	return value.errors != null
}
