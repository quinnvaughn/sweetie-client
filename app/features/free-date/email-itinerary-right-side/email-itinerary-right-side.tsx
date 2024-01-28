import { GoOnThisDateButton } from "~/features/date-itinerary"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { flex } from "~/styled-system/patterns"

export function EmailItineraryRightSide() {
	return (
		<VStack
			id="go-on-this-date-desktop"
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
			<VStack gap={2} alignContent={"flex-start"} justifyContent={"flex-start"}>
				<div className={flex({ justifyContent: "center", width: "100%" })}>
					<p className={css({ textStyle: "paragraph", textAlign: "center" })}>
						Add to your calendar for{" "}
						<span
							className={css({
								fontWeight: "bold",
								textStyle: "paragraph",
								color: "secondary",
							})}
						>
							free{" "}
						</span>
						and save yourself time.
					</p>
				</div>
			</VStack>
		</VStack>
	)
}
