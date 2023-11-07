import { css, cva } from "~/styled-system/css"
import { SocialLinks } from "../social-links"
import { DateTime } from "luxon"
import { useLocation } from "react-router-dom"
import { HStack } from "~/styled-system/jsx"

const mobileContainer = cva({
	base: {},
	variants: {
		isDatePage: {
			yes: {
				paddingBottom: "89px",
			},
			no: {},
		},
	},
})

export function MobileFooter() {
	const { pathname } = useLocation()
	const isDatePage = pathname.includes("/free-date/")
	return (
		<div className={mobileContainer({ isDatePage: isDatePage ? "yes" : "no" })}>
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
				<HStack
					gap={2}
					justifyContent="space-between"
					alignItems={"flex-start"}
				>
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
		</div>
	)
}
