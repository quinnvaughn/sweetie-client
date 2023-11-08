import { defineTextStyles } from "@pandacss/dev"

export const textStyles = defineTextStyles({
	paragraph: {
		description: "The body text style - used in paragraphs",
		value: {
			fontFamily: "roboto",
			fontWeight: "400",
			fontSize: "16px",
			lineHeight: "24px",
			letterSpacing: "0",
			textDecoration: "None",
			textTransform: "None",
			color: "black",
		},
	},
	caption: {
		description: "The description text style - used in captions",
		value: {
			fontFamily: "spectral",
			fontStyle: "italic",
			fontWeight: "500",
			fontSize: "14px",
			lineHeight: "20px",
			letterSpacing: "0",
			textDecoration: "None",
			textTransform: "None",
			wordBreak: "break-word",
			color: "black",
		},
	},
	h1: {
		description: "The heading 1 text style - used in h1",
		value: {
			fontFamily: "roboto",
			fontWeight: "700",
			fontSize: "40px",
			lineHeight: "48px",
			letterSpacing: "0",
			textDecoration: "None",
			textTransform: "None",
			color: "black",
		},
	},
	error: {
		description: "The error text style - used in error messages",
		value: {
			fontFamily: "roboto",
			fontWeight: "400",
			fontSize: "14px",
			lineHeight: "24px",
			letterSpacing: "0",
			textDecoration: "None",
			textTransform: "None",
			color: "red",
		},
	},
})
