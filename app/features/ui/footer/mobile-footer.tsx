import { Link } from "@remix-run/react"
import { DateTime } from "luxon"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { SocialLinks } from "../social-links"

const link = css({
	color: "black",
	textDecoration: "none",
	fontWeight: "bold",
	_hover: {
		textDecoration: "underline",
	},
})

export function MobileFooter() {
	return (
		<div
			className={css({
				borderTop: "1px solid",
				borderColor: "gray",
				display: "flex",
				flexDirection: "column",
				gap: 4,
				padding: 5,
				backgroundColor: "#F7F7F7",
			})}
		>
			<HStack gap={3} width={"100%"} justifyContent={"space-between"}>
				<Link className={link} to={$path("/links")}>
					Social Links
				</Link>
				<Link className={link} to={$path("/blog")}>
					Blog
				</Link>
			</HStack>
			<HStack gap={2} justifyContent="space-between" alignItems={"flex-start"}>
				<p className={css({ textStyle: "paragraph" })}>
					© {DateTime.now().year} trysweetie.com
				</p>
				<Link className={link} to={$path("/privacy-policy")}>
					Privacy Policy
				</Link>
				<a className={link} href={"https://discord.gg/2qyk3vcQXa"}>
					Support
				</a>
			</HStack>
		</div>
	)
}
