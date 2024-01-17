import { useFetcher, useLocation, useRouteLoaderData } from "@remix-run/react"
import { useState } from "react"
import { $path } from "remix-routes"
import { SignInPopupModal } from "~/features/auth"
import { useOutsideClick } from "~/hooks"
import { loader } from "~/root"
import { action } from "~/routes/api.hide-sign-in-modal"
import { css } from "~/styled-system/css"
import { Desktop } from "../.."

export function NotLoggedInActions() {
	const { pathname } = useLocation()
	const result = useRouteLoaderData<typeof loader>("root")
	const [showLogin, setShowLogin] = useState(result?.showSigninModal ?? false)
	const fetcher = useFetcher<typeof action>()

	function toggleShowLogin(value: boolean) {
		if (result?.showSigninModal) {
			fetcher.submit(
				{},
				{
					method: "post",
					action: $path("/api/hide-sign-in-modal"),
				},
			)
		}
		setShowLogin(value)
	}

	const ref = useOutsideClick<HTMLDivElement>(() => toggleShowLogin(false))

	return (
		<>
			{pathname !== $path("/login") && pathname !== $path("/register") && (
				<div className={css({ position: "relative" })} ref={ref}>
					<button
						type="submit"
						onClick={() => toggleShowLogin(!showLogin)}
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
