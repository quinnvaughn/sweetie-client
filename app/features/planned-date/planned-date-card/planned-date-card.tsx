import { DateTime } from "luxon"
import { FreeDateCard } from "~/features/free-date"
import { PlannedDateCardFragment } from "~/graphql/generated"
import { getNumberSuffix } from "~/lib"
import { VStack } from "~/styled-system/jsx"

type Props = {
	plannedDate: PlannedDateCardFragment
}

export function PlannedDateCard({ plannedDate }: Props) {
	return (
		<VStack gap={2} alignItems={"flex-start"}>
			{plannedDate.variation?.freeDate && (
				<FreeDateCard date={plannedDate.variation.freeDate} />
			)}
			<p>
				<strong>Date</strong>:{" "}
				{DateTime.fromJSDate(new Date(plannedDate.plannedTime)).toFormat(
					`EEE, MMM d'${getNumberSuffix(
						DateTime.fromJSDate(new Date(plannedDate.plannedTime)).day,
					)}'`,
				)}
				{" | "}
				<strong>Time</strong>:{" "}
				{DateTime.fromJSDate(new Date(plannedDate.plannedTime)).toFormat(
					"h:mm a",
				)}
				{plannedDate.guest && " | "}
				{plannedDate.guest && <strong>Guest: </strong>}
				{plannedDate.guest?.name}
			</p>
		</VStack>
	)
}
