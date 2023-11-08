import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi/index.js"
import { match } from "ts-pattern"
import { css, cva } from "~/styled-system/css"

type Props = {
	icon: "left" | "right"
	onClick: () => void
}

const iconButton = cva({
	base: {
		color: "black",
	},
	variants: {
		hover: {
			true: {
				color: "white",
			},
			false: {
				color: "black",
			},
		},
	},
})

export default function ForwardAndBackButton({ icon, onClick }: Props) {
	const [hover, setHover] = useState(false)
	return (
		<button
			className={css({
				border: "none",
				backgroundColor: "transparent",
				cursor: "pointer",
				padding: "8px",
				borderRadius: "4px",
				color: "black",
				_hover: {
					color: "white",
					backgroundColor: "secondary",
				},
			})}
			type="button"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={onClick}
		>
			{match(icon)
				.with("left", () => (
					<FiChevronLeft size={16} className={iconButton({ hover })} />
				))
				.with("right", () => (
					<FiChevronRight size={16} className={iconButton({ hover })} />
				))
				.exhaustive()}
		</button>
	)
}
