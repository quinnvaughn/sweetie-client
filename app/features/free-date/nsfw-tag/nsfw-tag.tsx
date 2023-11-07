import { cva } from "~/styled-system/css"

const nsfw = cva({
	base: {
		lineHeight: 1,
		fontWeight: "bold",
		color: "white",
		bgColor: "red",
		alignSelf: "flex-start",
		borderRadius: "4px",
	},
	variants: {
		size: {
			sm: {
				fontSize: "12px",
				padding: "4px",
			},
			lg: {
				fontSize: "18px",
				padding: "8px",
			},
		},
	},
})

type Props = {
	size?: "sm" | "lg"
}

export function NSFWTag({ size = "sm" }: Props) {
	return <span className={nsfw({ size })}>NSFW</span>
}
