import { css } from "~/styled-system/css"
import DaysOfMonth from "./days-of-month"
import ForwardAndBackButton from "./forward-and-back-button"
import Weekdays from "./weekdays"
import { DateTime, Info } from "luxon"
import { useEffect, useState } from "react"
import { match } from "ts-pattern"
import { HStack } from "~/styled-system/jsx"

type Props = {
	date: DateTime
	setCurrentDate: (date: DateTime) => void
	preventBefore?: DateTime
}

export default function Calendar({
	date,
	setCurrentDate,
	preventBefore,
}: Props) {
	const [currentIndex, setCurrentIndex] = useState<number>(date.month - 1)
	const [currentMonth, setCurrentMonth] = useState<string>(
		Info.months()[currentIndex],
	)
	const [currentYear, setCurrentYear] = useState<number>(date.year)

	useEffect(() => {
		setCurrentMonth(Info.months()[currentIndex])
	}, [currentIndex])

	useEffect(() => {
		setCurrentIndex(date.month - 1)
	}, [date])

	return (
		<div
			className={css({
				position: "absolute",
				inset: "108% auto auto 0px",
				width: "100%",
				backgroundColor: "white",
				borderRadius: "8px",
				border: "1px solid",
				borderColor: "gray",
				zIndex: 1,
			})}
		>
			<HStack
				gap={4}
				justifyContent="space-around"
				paddingY={"8px"}
				alignItems="center"
			>
				<ForwardAndBackButton
					icon="left"
					onClick={() =>
						setCurrentIndex((prev) =>
							match(prev)
								.with(0, () => {
									setCurrentYear(currentYear - 1)
									return 11
								})
								.otherwise(() => prev - 1),
						)
					}
				/>
				<span className={css({ textStyle: "paragraph" })}>
					{currentMonth} {currentYear}
				</span>
				<ForwardAndBackButton
					icon="right"
					onClick={() =>
						setCurrentIndex((prev) =>
							match(prev)
								.with(11, () => {
									setCurrentYear(currentYear + 1)
									return 0
								})
								.otherwise(() => prev + 1),
						)
					}
				/>
			</HStack>
			<Weekdays />
			<DaysOfMonth
				preventBefore={preventBefore}
				month={currentIndex + 1}
				year={currentYear}
				setCurrentDate={setCurrentDate}
				currentDate={date}
			/>
		</div>
	)
}
