import { css, cva } from "~/styled-system/css"

const button = css({
	base: {
		background: "none",
		border: "none",
		padding: 0,
		cursor: "pointer",
		borderBottom: "2px solid transparent",
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
				borderBottom: "2px solid",
				borderBottomColor: "secondary",
				color: "secondary",
			},
			false: {
				borderBottom: "2px solid transparent",
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
	console.log({ active })
	return (
		<button type="button" className={button} onClick={onClick}>
			<p className={text({ active })}>{title}</p>
		</button>
	)
}
