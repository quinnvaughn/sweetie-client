import { css } from "~/styled-system/css"

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export function HamburgerDropdown({ children }: Props) {
	return (
		<div
			className={css({
				position: "absolute",
				right: 0,
				transform: "translateY(4px)",
				minWidth: "180px",
				padding: 4,
				backgroundColor: "white",
				border: "1px solid var(--colors-gray)",
				zIndex: 100,
				width: "190px",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				borderRadius: 4,
				gap: 4,
			})}
		>
			{children}
		</div>
	)
}
