import { defineConfig } from "@pandacss/dev"
import { buttonRecipe } from "~/recipes"
import { textStyles } from "~/theme"

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	globalCss: {
		html: {
			height: "100%",
		},
		body: {
			"--fonts-roboto": "Roboto, sans-serif",
			"--fonts-spectral": "Spectral, serif",
			"font-family": "var(--fonts-roboto)",
			"line-height": "1.5",
			height: "100%",
			minHeight: "100%",
			display: "flex",
			flexDirection: "column",
		},
	},

	// The extension for the emitted JavaScript files
	outExtension: "js",
	// Where to look for your css declarations
	include: [
		"./app/routes/**/*.{ts,tsx,js,jsx}",
		"./app/features/**/*.{ts,tsx,js,jsx}",
	],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			recipes: {
				button: buttonRecipe,
			},
			keyframes: {
				slideUp: {
					"0%": {
						opacity: 0,
						transform: "translateY(100%)",
					},
					"100%": {
						opacity: 1,
						transform: "translateY(0)",
					},
				},
				slideIn: {
					"0%": {
						opacity: 0,
						transform: "translateX(100%)",
					},
					"100%": {
						opacity: 1,
						transform: "translateX(0)",
					},
				},
				slideOut: {
					"0%": {
						opacity: 1,
						transform: "translateX(0)",
					},
					"100%": {
						opacity: 0,
						transform: "translateX(100%)",
					},
				},
				progressBar: {
					"0%": {
						width: "100%",
					},
					"100%": {
						width: "0%",
					},
				},
			},
			textStyles,
			tokens: {
				colors: {
					primary: {
						value: "#FF559D",
					},
					secondary: {
						value: "#6255ff",
					},
					tertiary: {
						value: "#55FFB7",
					},
					quarternary: {
						value: "#F2FF55",
					},
					gray: {
						value: "#DDDDDD",
					},
					grayText: {
						value: "#717171",
					},
					white: {
						value: "#FFFFFF",
					},
					black: {
						value: "#222222",
					},
				},
				fonts: {
					roboto: {
						value: "var(--fonts-roboto)",
					},
					spectral: {
						value: "var(--fonts-spectral)",
					},
				},
			},
		},
	},

	patterns: {
		extend: {
			numLines: {
				description:
					"Simplifies the declaration of the number of lines of text",
				properties: {
					// The direction of the scroll
					lines: { type: "number" },
				},
				transform(props) {
					const { lines, ...rest } = props
					return {
						overflow: "hidden",
						display: "-webkit-box",
						"-webkit-box-orient": "vertical",
						"-webkit-line-clamp": lines,
						...rest,
					}
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "app/styled-system",
	jsxFramework: "react",
})
