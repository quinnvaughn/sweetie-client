import { css } from "~/styled-system/css"
import { SocialLinks } from "../social-links"
import { MobileFooter } from "./mobile-footer"
import { DateTime } from "luxon"
import { Desktop, Mobile } from ".."

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
				</div>
			</Desktop>
		</>
	)
}
