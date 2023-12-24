import { PlannedDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { PlannedDateCard } from "../planned-date-card"

type Props = {
	plannedDates: PlannedDateCardFragment[]
}

export function PlannedDateList({ plannedDates }: Props) {
	return (
		<div
			className={css({
				display: "grid",
				columnGap: 4,
				rowGap: 6,
				gridTemplateColumns: {
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				},
			})}
		>
			{plannedDates.map((plannedDate) => (
				<PlannedDateCard key={plannedDate.id} plannedDate={plannedDate} />
			))}
		</div>
	)
}
