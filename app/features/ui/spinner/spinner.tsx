import { css, cva } from "~/styled-system/css"

const bar = cva({
	base: {
		borderRadius: "50%",
		animation: "spin 1.5s linear infinite",
	},
	variants: {
		size: {
			xs: {
				width: "20px",
				height: "20px",
				border: "2px solid #f3f3f3",
				borderTop: "2px solid #55FFB7",
			},
		},
	},
	defaultVariants: {
		size: "xs",
	},
})

const grid = cva({
	base: {
		display: "grid",
		justifyContent: "center",
		alignItems: "center",
	},
	variants: {
		size: {
			xs: {
				height: "20px",
			},
		},
	},
	defaultVariants: {
		size: "xs",
	},
})

type Props = {
	size?: "xs"
}

export function Spinner({ size = "xs" }: Props) {
	return (
		<div className={grid({ size })}>
			<div className={bar({ size })} />
		</div>
	)
}
