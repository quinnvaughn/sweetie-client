import { useIsSubmitting } from "remix-validated-form"

type Props = {
	label?: string
}

export function SubmitButton({ label = "Submit" }: Props) {
	const isSubmitting = useIsSubmitting()

	return (
		<button type="submit" disabled={isSubmitting}>
			{label}
		</button>
	)
}
