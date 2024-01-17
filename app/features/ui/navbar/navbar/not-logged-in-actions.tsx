import { useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import { $path } from "remix-routes"
import { SignInPopupModal } from "~/features/auth"
import { useOutsideClick } from "~/hooks"
import { loginStore } from "~/stores"
import { css } from "~/styled-system/css"
import { Desktop } from "../.."

export function NotLoggedInActions() {
	const { pathname } = useLocation()
	const { setShowLoginPopup, showLoginPopup } = loginStore()
	const [showLogin, setShowLogin] = useState(showLoginPopup ?? false)
	const ref = useOutsideClick<HTMLDivElement>(() => {
		if (showLoginPopup) {
			setShowLoginPopup(false)
		}
		setShowLogin(false)
	})

	return (
		<>
			{pathname !== $path("/login") && pathname !== $path("/register") && (
				<div className={css({ position: "relative" })} ref={ref}>
					<button
						type="submit"
						onClick={(e) => {
							setShowLogin(!showLogin)
							e.preventDefault()
							e.stopPropagation()
						}}
						className={css({
							backgroundColor: "transparent",
							border: "none",
							cursor: "pointer",
							color: "black",
							fontWeight: 600,
							textAlign: "left",
							whiteSpace: "nowrap",
							_hover: {
								color: "secondary",
								filter: "brightness(110%)",
							},
						})}
					>
						Sign in
					</button>
					{showLogin && (
						<Desktop>
							<SignInPopupModal />
						</Desktop>
					)}
				</div>
			)}
		</>
	)
}
