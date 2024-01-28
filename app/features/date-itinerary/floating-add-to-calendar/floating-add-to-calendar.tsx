import { useEffect, useState } from "react"
import { freeDateStore } from "~/stores"
import { css, cva } from "~/styled-system/css"
import { flex } from "~/styled-system/patterns"
import { GoOnThisDateButton } from "../go-on-this-date-button"

const container = cva({
	base: {
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
		zIndex: 10,
		transition: "all 0.2s",
	},
	variants: {
		visible: {
			true: {
				opacity: 1,
			},
			false: {
				opacity: 0,
			},
		},
	},
})

export function FloatingAddToCalendar() {
	const { showOnboardingTutorial } = freeDateStore()
	const [scrollY, setScrollY] = useState(0)
	const [showFloatingButton, setShowFloatingButton] = useState(true)
	// if the user stops scrolling for a while, show the floating button
	const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
		null,
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollTimeout) {
			clearTimeout(scrollTimeout)
		}
		setScrollTimeout(
			setTimeout(() => {
				setShowFloatingButton(true)
			}, 4000),
		)
	}, [scrollY])
	// check if user is scrolling down or up
	// if down, hide the floating button
	// if up, show the floating button
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const currentScrollY = window.scrollY
			// user is scrolling down
			// add a threshold to prevent the button from hiding when user is scrolling down a little bit
			if (currentScrollY > scrollY + 100) {
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

	return (
		<div
			id="go-on-this-date-mobile"
			className={container({
				visible: showOnboardingTutorial || showFloatingButton,
			})}
		>
			<div className={flex({ justifyContent: "center", width: "100%" })}>
				<p className={css({ textStyle: "paragraph", textAlign: "center" })}>
					Add to your calendar for{" "}
					<span
						className={css({
							fontWeight: "bold",
							textStyle: "paragraph",
							color: "secondary",
						})}
					>
						free{" "}
					</span>
					and save yourself time.
				</p>
			</div>
			<GoOnThisDateButton />
		</div>
	)
}
