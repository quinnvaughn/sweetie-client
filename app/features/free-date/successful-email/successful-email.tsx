import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import {
	CopyLinkShareButton,
	FacebookShareButton,
	MessagesShareButton,
	TwitterShareButton,
	WhatsAppShareButton,
} from "~/features/ui"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const campaign = "date itinerary success"

type Props = {
	guestName?: string
	userEmail?: string
	link: string
}

export function SuccessfulEmail({ guestName, userEmail, link }: Props) {
	const { isLoggedIn } = useViewer()
	return (
		<VStack gap={4}>
			<p className={css({ textAlign: "center", textStyle: "paragraph" })}>
				We successfully emailed you
				{guestName ? ` and ${guestName.split(" ")[0]} ` : ""} the itinerary!
				Check your email for more details. Check your spam folder if you don't
				see it.
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
			<p
				className={css({
					fontWeight: "bold",
					textAlign: "center",
					textStyle: "paragraph",
				})}
			>
				Want to share this date idea with your friends?
			</p>
			<VStack gap={4}>
				<CopyLinkShareButton
					link={link}
					css={{ width: "250px" }}
					campaign={campaign}
				/>
				<FacebookShareButton
					link={link}
					css={{ width: "250px" }}
					campaign={campaign}
				/>
				<TwitterShareButton
					link={link}
					css={{ width: "250px" }}
					campaign={campaign}
				/>
				<MessagesShareButton
					link={link}
					css={{ width: "250px" }}
					campaign={campaign}
				/>
				<WhatsAppShareButton
					link={link}
					css={{ width: "250px" }}
					campaign={campaign}
				/>
			</VStack>
		</VStack>
	)
}
