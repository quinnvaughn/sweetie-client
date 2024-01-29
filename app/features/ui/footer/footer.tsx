import { Link } from "@remix-run/react"
import { DateTime } from "luxon"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { Desktop, Mobile } from ".."
import { SocialLinks } from "../social-links"
import { MobileFooter } from "./mobile-footer"

const link = css({
	color: "black",
	textDecoration: "none",
	fontWeight: "bold",
	_hover: {
		textDecoration: "underline",
	},
})

export function Footer() {
	return (
		<>
			<Mobile>
				<MobileFooter />
			</Mobile>
			<Desktop>
				<div
					className={css({
						borderTop: "1px solid",
						borderColor: "gray",
						display: "flex",
						justifyContent: "space-between",
						padding: "16px",
						backgroundColor: "#F7F7F7",
					})}
				>
					<HStack gap={3}>
						<Link className={link} to={$path("/links")}>
							Social Links
						</Link>
						<Link className={link} to={$path("/blog")}>
							Blog
						</Link>
					</HStack>
					<p className={css({ textStyle: "paragraph" })}>
						© {DateTime.now().year} trysweetie.com
					</p>
					<HStack gap={3}>
						<Link className={link} to={$path("/privacy-policy")}>
							Privacy Policy
						</Link>
						<a className={link} href={"https://discord.gg/2qyk3vcQXa"}>
							Support
						</a>
					</HStack>
				</div>
			</Desktop>
		</>
	)
}
