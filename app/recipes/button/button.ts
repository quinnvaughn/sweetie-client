import { cva } from "~/styled-system/css"

export const button = cva({
	base: {
		color: "white",
		fontWeight: "bold",
		fontFamily: "roboto",
		cursor: "pointer",
		borderRadius: "8px",
		_disabled: {
			opacity: 0.5,
			cursor: "not-allowed",
		},
	},
	variants: {
		visual: {
			solid: { border: "none" },
			outlined: { backgroundColor: "white" },
		},
		variant: {
			primary: { backgroundColor: "primary" },
			secondary: { backgroundColor: "secondary" },
			black: { backgroundColor: "black" },
		},
		size: {
			sm: { padding: "8px", fontSize: "12px" },
			md: { padding: "8px 16px", fontSize: "18px" },
			lg: { padding: "16px 24px", fontSize: "24px" },
		},
	},
	compoundVariants: [
		{
			visual: "outlined",
			variant: "primary",
			css: { border: "1px solid var(--colors-primary)" },
		},
		{
			visual: "outlined",
			variant: "secondary",
			css: { border: "1px solid var(--colors-secondary)" },
		},
		{
			visual: "outlined",
			variant: "black",
			css: { border: "1px solid var(--colors-black)" },
		},
	],
	defaultVariants: {
		visual: "solid",
		variant: "primary",
		size: "md",
	},
})
