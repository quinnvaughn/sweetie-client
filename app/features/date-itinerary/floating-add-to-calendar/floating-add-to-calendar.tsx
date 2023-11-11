import { GoOnThisDateButton } from "../go-on-this-date-button"
import { css } from "~/styled-system/css"

export function FloatingAddToCalendar() {
	return (
		<div
			className={css({
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				padding: "20px",
				background: "white",
				borderTop: "1px solid",
				borderTopColor: "gray",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			})}
		>
			<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
				Free
			</p>
			<GoOnThisDateButton />
		</div>
	)
}
