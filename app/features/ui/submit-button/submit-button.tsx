import { useIsSubmitting } from "remix-validated-form"
import { ButtonVariantProps, button } from "~/styled-system/recipes"

type Props = {
	label?: string
	variant?: ButtonVariantProps["variant"]
	size?: ButtonVariantProps["size"]
}

export function SubmitButton({
	label = "Submit",
	variant = "primary",
	size = "lg",
}: Props) {
	const isSubmitting = useIsSubmitting()

	return (
		<button
			className={button({ variant, size })}
			type="submit"
			disabled={isSubmitting}
		>
			{label}
		</button>
	)
}
