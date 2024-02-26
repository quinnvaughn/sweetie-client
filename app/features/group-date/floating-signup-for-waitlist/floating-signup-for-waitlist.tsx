import { useEffect, useState } from "react"
import { GetUserToSignUpModal } from "~/features/ui"
import { useViewer } from "~/hooks"
import { css, cva } from "~/styled-system/css"

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

export function FloatingSignupForWaitlist() {
	const { isLoggedIn } = useViewer()
	const [open, setIsOpen] = useState(false)
	const [openModal, setOpenModal] = useState(false)

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
			}, 3000),
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
			className={container({
				visible: showFloatingButton,
			})}
		>
			{!isLoggedIn() && (
				// add a pop up to login
				<>
					<p>
						<button
							type="button"
							className={css({
								color: "secondary",
								fontWeight: "bold",
								cursor: "pointer",
							})}
							onClick={() => setIsOpen(true)}
						>
							Login
						</button>{" "}
						to sign up for the wailist
					</p>
					{open && (
						<GetUserToSignUpModal
							onClose={() => setIsOpen(false)}
							onSuccess={() => setIsOpen(false)}
							headingText="Sign up for the waitlist"
							bodyText="You need to be logged in to sign up for the waitlist. If you don't have an account, you can create one for free."
						/>
					)}
				</>
			)}
			<button
				className={css({
					width: "100%",
					padding: "16px 8px",
					borderRadius: "8px",
					backgroundColor: "primary",
					color: "white",
					fontWeight: "bold",
					cursor: "pointer",
					_disabled: {
						opacity: 0.5,
						cursor: "not-allowed",
					},
					_hover: {
						filter: "brightness(110%)",
					},
				})}
				type="button"
				onClick={() => {}}
				disabled={!isLoggedIn()}
			>
				Signup for the waitlist
			</button>
		</div>
	)
}
