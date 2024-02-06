import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { Desktop, Mobile } from "~/features/ui"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

export function PayForMyDate() {
	return (
		<>
			<Desktop css={{ width: "100%" }}>
				<HStack
					padding={"24px"}
					borderRadius={"8px"}
					width={"100%"}
					boxShadow={"sm"}
					justifyContent={"space-between"}
					backgroundColor={"#210124"}
				>
					<p
						className={css({
							textStyle: "paragraph",
							color: "white",
							fontWeight: "500",
						})}
					>
						Want money off your next date?
					</p>
					<Link
						to={$path("/contest/pay-for-my-date")}
						className={button({
							variant: "secondary",
						})}
					>
						Find out more!
					</Link>
				</HStack>
			</Desktop>
			<Mobile css={{ width: "100%" }}>
				<VStack
					padding={"24px"}
					borderRadius={"8px"}
					borderColor={"gray"}
					border={"1px solid"}
					width={"100%"}
					boxShadow={"sm"}
					justifyContent={"space-between"}
					backgroundColor={"#210124"}
				>
					<p
						className={css({
							textStyle: "paragraph",
							color: "white",
							fontWeight: "500",
						})}
					>
						Want money off your next date?
					</p>
					<Link
						to={$path("/contest/pay-for-my-date")}
						className={button({
							variant: "secondary",
						})}
					>
						Find out more!
					</Link>
				</VStack>
			</Mobile>
		</>
	)
}
