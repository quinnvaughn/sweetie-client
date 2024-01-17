import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

export function GetUserToLoginSection() {
	return (
		<HStack
			padding={"24px"}
			borderRadius={"8px"}
			borderColor={"gray"}
			border={"1px solid"}
			width={"100%"}
			boxShadow={"sm"}
			justifyContent={"space-between"}
			backgroundColor={"#191e3b"}
		>
			<p
				className={css({
					textStyle: "paragraph",
					color: "white",
					fontWeight: "500",
				})}
			>
				Members can link calendars, save date details, and track their dating
				history.
			</p>
			<Link
				to={$path("/login")}
				className={button({ variant: "secondary", size: "md" })}
			>
				Sign in
			</Link>
		</HStack>
	)
}
