import { defineRecipe } from "@pandacss/dev"

export const buttonRecipe = defineRecipe({
	className: "button",
	description: "A button",
	base: {
		color: "white",
		fontWeight: "bold",
		fontFamily: "roboto",
		cursor: "pointer",
		borderRadius: "8px",
		fontSize: "16px",
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
			tertiary: { backgroundColor: "tertiary", color: "black" },
			black: { backgroundColor: "black" },
		},
		size: {
			sm: { padding: "8px" },
			md: { padding: "8px 32px" },
			lg: { padding: "12px 64px" },
			xl: { padding: "12px 128px" },
		},
	},
	compoundVariants: [
		{
			visual: "outlined",
			variant: "primary",
			css: {
				border: "1px solid var(--colors-primary)",
				backgroundColor: "white",
				color: "primary",
			},
		},
		{
			visual: "outlined",
			variant: "secondary",
			css: {
				border: "1px solid var(--colors-secondary)",
				backgroundColor: "white",
				color: "secondary",
			},
		},
		{
			visual: "outlined",
			variant: "black",
			css: {
				border: "1px solid var(--colors-black)",
				backgroundColor: "white",
				color: "black",
			},
		},
		{
			visual: "outlined",
			variant: "tertiary",
			css: {
				border: "1px solid var(--colors-tertiary)",
				backgroundColor: "white",
				color: "tertiary",
			},
		},
	],
	defaultVariants: {
		visual: "solid",
		variant: "primary",
		size: "md",
	},
	jsx: ["Button", "SubmitButton"],
})
