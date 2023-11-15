import { useIsSubmitting } from "remix-validated-form"
import { ButtonVariant, button } from "~/styled-system/recipes"

type Props = Partial<ButtonVariant> & {
	label: string
}

export function SubmitButton(props: Props) {
	const isSubmitting = useIsSubmitting()

	return (
		<button
			className={button({ ...props })}
			type="submit"
			disabled={isSubmitting}
		>
			{props.label}
		</button>
	)
}
