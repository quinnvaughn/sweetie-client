import { HStack } from "~/styled-system/jsx"
import { ButtonVariantProps, button } from "~/styled-system/recipes"

type Props = ButtonVariantProps & {
	children?: React.ReactNode | React.ReactNode[]
	type?: "button" | "submit" | "reset"
	icon?: React.ReactNode
	onClick?: () => void
	disabled?: boolean
}

export function Button({
	type = "button",
	variant,
	visual,
	size,
	children,
	icon,
	onClick,
	disabled,
}: Props) {
	return (
		<button
			disabled={disabled}
			type={type}
			className={button({ variant, size, visual })}
			onClick={onClick}
		>
			<HStack gap={1} justifyContent="center" alignItems="center">
				{icon && icon}
				{children}
			</HStack>
		</button>
	)
}
