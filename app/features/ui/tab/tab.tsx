import { cva } from "~/styled-system/css"

const button = cva({
	base: {
		background: "none",
		border: "none",
		padding: 0,
		cursor: "pointer",
		borderBottom: "2px solid",
		borderColor: "transparent",
	},
	variants: {
		active: {
			true: {
				borderColor: "secondary",
			},
			false: {
				borderColor: "transparent",
			},
		},
	},
})

const text = cva({
	base: {
		fontSize: "18px",
		color: "black",
		textStyle: "paragraph",
	},
	variants: {
		active: {
			true: {
				color: "secondary",
			},
			false: {
				color: "black",
			},
		},
	},
})

type Props = {
	title: string
	onClick: () => void
	active: boolean
}

export function Tab({ title, onClick, active }: Props) {
	return (
		<button type="button" className={button({ active })} onClick={onClick}>
			<p className={text({ active })}>{title}</p>
		</button>
	)
}
