import { useOutsideClick } from "~/hooks"
import { css } from "~/styled-system/css"
import { Dispatch, SetStateAction } from "react"
import { FiAlignJustify } from "react-icons/fi/index.js"

const customButton = css({
	background: "none",
	border: "none",
	cursor: "pointer",
	color: "black",
	_hover: {
		color: "secondary",
		filter: "brightness(150%)",
	},
})

const parent = css({
	position: "relative",
	height: "100%",
	lineHeight: 1,
})

const icon = css({
	color: "black",
})

type MobileHamburgerProps = {
	setIsOpen: Dispatch<SetStateAction<boolean>>
	children: React.ReactNode
}

export function MobileHamburger({ setIsOpen, children }: MobileHamburgerProps) {
	const parentRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))
	return (
		<div className={parent} ref={parentRef}>
			<button
				type="button"
				className={customButton}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<FiAlignJustify size={28} className={icon} />
			</button>
			{children}
		</div>
	)
}
