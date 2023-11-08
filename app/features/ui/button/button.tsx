import { ButtonVariant, button } from "~/styled-system/recipes"

type Props = {
	type?: "button" | "submit" | "reset"
	variant?: ButtonVariant["variant"]
	size?: ButtonVariant["size"]
	children: React.ReactNode | React.ReactNode[]
}

export function Button({ type = "button", variant, size, children }: Props) {
	return (
		<button type={type} className={button({ variant, size })}>
			{children}
		</button>
	)
}
