import { useEffect, useState } from "react"
import { css } from "~/styled-system/css"
import { flex } from "~/styled-system/patterns"
import { GoOnThisDateButton } from "../go-on-this-date-button"

export function FloatingAddToCalendar() {
	const [scrollY, setScrollY] = useState(0)
	const [showFloatingButton, setShowFloatingButton] = useState(true)
	// check if user is scrolling down or up
	// if down, hide the floating button
	// if up, show the floating button
	useEffect(() => {
		window.addEventListener("scroll", () => {
			// check if user is at the bottom of the page
			// if so, hide the floating button
			// if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			// 	setShowFloatingButton(false)
			// 	return
			// }
			const currentScrollY = window.scrollY
			// user is scrolling down
			if (currentScrollY > scrollY) {
				setScrollY(currentScrollY)
				setShowFloatingButton(false)
				return
				// add a threshold to prevent the button from showing when user is scrolling up a little bit
			} else if (currentScrollY < scrollY - 100) {
				setScrollY(currentScrollY)
				setShowFloatingButton(true)
				return
			}
		})
		return () => window.removeEventListener("scroll", () => {})
	}, [scrollY])

	if (!showFloatingButton) return null

	return (
		<div
			id="floating-add-to-calendar"
			className={css({
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				padding: "10px 20px",
				background: "white",
				borderTop: "1px solid",
				borderTopColor: "gray",
				display: "flex",
				gap: 2,
				flexDirection: "column",
				alignItems: "center",
			})}
		>
			<div className={flex({ justifyContent: "center", width: "100%" })}>
				<p className={css({ textStyle: "paragraph" })}>
					Add to your calendar for{" "}
					<span
						className={css({
							fontWeight: "bold",
							textStyle: "paragraph",
							color: "secondary",
						})}
					>
						free
					</span>
				</p>
			</div>
			<GoOnThisDateButton />
		</div>
	)
}
