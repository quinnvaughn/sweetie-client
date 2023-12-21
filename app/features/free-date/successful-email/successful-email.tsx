import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	guestName?: string
	guestEmail?: string
	userEmail?: string
	addedGuest?: boolean
	hasDefaultGuest?: boolean
	sendToDefaultGuest?: boolean
	authorizedGoogleCalendar?: boolean
}

export function SuccessfulEmail({
	guestName,
	guestEmail,
	userEmail,
	addedGuest,
	hasDefaultGuest,
	sendToDefaultGuest,
	authorizedGoogleCalendar,
}: Props) {
	const { isLoggedIn } = useViewer()
	return (
		<VStack gap={4}>
			<p className={css({ textAlign: "center", textStyle: "paragraph" })}>
				{authorizedGoogleCalendar
					? `We successfully added the date to your calendar${
							hasDefaultGuest && sendToDefaultGuest
								? guestName
									? ` and emailed ${guestName.split(" ")[0]}`
									: "and emailed your date"
								: guestName
								? ` and emailed ${guestName.split(" ")[0]}`
								: ""
					  }!`
					: `We successfully emailed you
				${
					hasDefaultGuest && sendToDefaultGuest
						? guestName
							? ` and ${guestName.split(" ")[0]} `
							: "and your date"
						: guestName
						? ` and ${guestName.split(" ")[0]} `
						: ""
				}
				the itinerary! Check your email for more details. Check your spam folder
				if you don't see it.`}
			</p>
			{!isLoggedIn() && (
				<p
					className={css({
						textAlign: "center",
						textStyle: "paragraph",
					})}
				>
					<Link
						to={$path("/register")}
						state={{ email: userEmail }}
						className={css({
							textDecoration: "underline",
							color: "primary",
						})}
					>
						Create an account
					</Link>{" "}
					so you don't have to enter your information again.
				</p>
			)}
			{/** We let a user add a default guest to future dates. */}
			{addedGuest && !hasDefaultGuest && isLoggedIn() && (
				<p
					className={css({
						textAlign: "center",
						textStyle: "paragraph",
					})}
				>
					Want to save time?{" "}
					<Link
						to={$path("/account-settings/date-settings/add-guest")}
						state={{ email: guestEmail, name: guestName }}
						className={css({
							textDecoration: "underline",
							color: "primary",
						})}
					>
						Add your guest as a default
					</Link>{" "}
					to future dates.
				</p>
			)}
		</VStack>
	)
}
