import { DateAnalyticsCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { DateAnalyticsCard } from "../date-analytics-card"

type Props = {
	dates: DateAnalyticsCardFragment[]
}

export function DateAnalyticsList({ dates }: Props) {
	return (
		<div
			className={css({
				display: "grid",
				gap: 2,
				gridTemplateColumns: {
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				},
			})}
		>
			{dates.map((date) => (
				<DateAnalyticsCard key={date.id} date={date} />
			))}
		</div>
	)
}
