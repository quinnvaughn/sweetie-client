import { DateTime } from "luxon"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { SocialLinks } from "../social-links"

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
			<SocialLinks />
			<HStack gap={2} justifyContent="space-between" alignItems={"flex-start"}>
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
			</HStack>
		</div>
	)
}
