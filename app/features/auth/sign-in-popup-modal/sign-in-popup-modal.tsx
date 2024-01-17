import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export function SignInPopupModal() {
	return (
		<div
			className={css({
				position: "absolute",
				overflowY: "hidden",
				zIndex: 400,
				boxShadow: "0 2px 0.75rem rgba(12,14,28,.08)",
				backgroundColor: "white",
				padding: "24px",
				right: 0,
				top: "calc(100% + 16px)",
				borderRadius: "8px",
				width: "375px",
			})}
		>
			<VStack gap={2} width={"100%"}>
				<p
					className={css({
						fontSize: "24px",
						fontWeight: 700,
						textDecoration: "none",
						color: "primary",
					})}
				>
					Sweetie
				</p>
				<p
					className={css({
						textStyle: "paragraph",
						fontWeight: "500",
						fontSize: "20px",
						textAlign: "center",
					})}
				>
					Link your calendar, save date details, and track your dating history.
				</p>
				<p className={css({ textStyle: "paragraph", textAlign: "center" })}>
					Sync your calendar, capture memorable dates, and curate your dating
					journey. Sign in for an enhanced experience!
				</p>
				<Link
					to={$path("/login")}
					className={css({
						backgroundColor: "secondary",
						color: "white",
						padding: "8px 16px",
						borderRadius: "4px",
						border: "none",
						cursor: "pointer",
						width: "100%",
						textAlign: "center",
						_hover: {
							filter: "brightness(120%)",
						},
					})}
				>
					Sign in
				</Link>
				<Link
					to={$path("/register")}
					className={css({
						backgroundColor: "transparent",
						color: "secondary",
						padding: "8px 16px",
						borderRadius: "4px",
						border: "none",
						cursor: "pointer",
						_hover: {
							filter: "brightness(120%)",
						},
					})}
				>
					Sign up, it's free!
				</Link>
			</VStack>
		</div>
	)
}
