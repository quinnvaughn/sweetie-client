import { GoOnThisDateButton } from "~/features/date-itinerary"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { flex } from "~/styled-system/patterns"

export function EmailItineraryRightSide() {
	return (
		<VStack
			gap={6}
			alignContent={"flex-start"}
			justifyContent={"flex-start"}
			className={css({
				border: "1px solid",
				borderColor: "gray",
				borderRadius: "8px",
				padding: "16px",
				width: "100%",
			})}
		>
			<GoOnThisDateButton />
			<div className={flex({ justifyContent: "center", width: "100%" })}>
				<p className={css({ textStyle: "paragraph" })}>
					Add to your calendar for{" "}
					<span
						className={css({
							fontWeight: "bold",
							textStyle: "paragraph",
							color: "secondary",
						})}
					>
						free
					</span>
				</p>
			</div>
		</VStack>
	)
}
