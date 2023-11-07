import { AddToCalendarButton } from "~/features/date-itinerary"
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
			<AddToCalendarButton />
			<div className={flex({ justifyContent: "space-between", width: "100%" })}>
				<p className={css({ fontWeight: "bold", textStyle: "paragraph" })}>
					Total
				</p>
				<p className={css({ fontWeight: "bold", textStyle: "paragraph" })}>
					Free
				</p>
			</div>
		</VStack>
	)
}
