import { Link } from "@remix-run/react"
import { DateTime } from "luxon"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { Desktop, Mobile } from ".."
import { SocialLinks } from "../social-links"
import { MobileFooter } from "./mobile-footer"

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
					<SocialLinks />
					<p className={css({ textStyle: "paragraph" })}>
						© {DateTime.now().year} trysweetie.com
					</p>
					<HStack gap={2}>
						<Link to={$path("/privacy-policy")}>Privacy Policy</Link>
						<a
							className={css({
								color: "black",
								textDecoration: "none",
								fontWeight: "bold",
								_hover: {
									textDecoration: "underline",
								},
							})}
							href={"https://discord.gg/2qyk3vcQXa"}
						>
							Support
						</a>
					</HStack>
				</div>
			</Desktop>
		</>
	)
}
