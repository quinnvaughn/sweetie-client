import { DateTime } from "luxon"
import { css, cva } from "~/styled-system/css"

const currentMonth = cva({
	base: {
		margin: "none",
		outline: "none",
		border: "none",
		borderRadius: "4px",
		flex: "0 0 14.285714285714286%",
		cursor: "pointer",
		padding: "8px",
		_disabled: {
			cursor: "not-allowed",
			color: "gray",
		},
	},
	variants: {
		currentDate: {
			true: {
				backgroundColor: "secondary",
				color: "white",
			},
			false: {
				backgroundColor: "white",
				color: "black",
			},
		},
		month: {
			previous: {
				color: "gray",
			},
			current: {
				color: "black",
			},
		},
	},
	defaultVariants: {
		month: "current",
		currentDate: false,
	},
})

function sameDay(a: DateTime, b: DateTime): boolean {
	return a.hasSame(b, "day") && a.hasSame(b, "month") && a.hasSame(b, "year")
}

function generateAllMonths(
	startOfMonth: number,
	daysInMonth: number,
	daysInPreviousMonth: number,
) {
	const previousDisplayedDates = Array.from(
		{ length: startOfMonth },
		(_, i) => daysInPreviousMonth - i,
	).reverse()

	const currentDisplayedDates = Array.from(
		{ length: daysInMonth },
		(_, i) => i + 1,
	)

	const nextDisplayedDates = Array.from(
		{
			length:
				7 -
				((previousDisplayedDates.length + currentDisplayedDates.length) % 7),
		},
		(_, i) => i + 1,
	)

	return [previousDisplayedDates, currentDisplayedDates, nextDisplayedDates]
}

function isDateDisabled(date: DateTime, preventBefore?: DateTime) {
	return preventBefore
		? preventBefore.startOf("day") > date.startOf("day")
		: DateTime.now().startOf("day") > date.startOf("day")
}

type Props = {
	month: number
	year: number
	setCurrentDate: (date: DateTime) => void
	currentDate: DateTime
	preventBefore?: DateTime
}

export default function DaysOfMonth({
	month,
	year,
	setCurrentDate,
	currentDate,
	preventBefore,
}: Props) {
	const daysInMonth = DateTime.local(year, month).daysInMonth || 30
	const startOfMonth = DateTime.local(year, month).startOf("month").weekday
	const previousMonth = DateTime.local(year, month).minus({ month: 1 })
	const daysInPreviousMonth = previousMonth.daysInMonth || 30
	const nextMonth = DateTime.local(year, month).plus({ month: 1 })

	const [previousDates, currentDates, nextDates] = generateAllMonths(
		startOfMonth,
		daysInMonth,
		daysInPreviousMonth,
	)

	return (
		<div
			className={css({
				display: "flex",
				flexWrap: "wrap",
				paddingBottom: "16px",
			})}
		>
			{previousDates.map((date) => {
				const newDate = DateTime.local(
					previousMonth.year,
					previousMonth.month,
					date,
				)
				return (
					<button
						type="button"
						className={currentMonth({
							currentDate: sameDay(currentDate, newDate),
							month: "previous",
						})}
						key={newDate.toString()}
						disabled={isDateDisabled(newDate, preventBefore)}
						onClick={() => setCurrentDate(newDate)}
					>
						{date}
					</button>
				)
			})}
			{currentDates.map((date) => {
				const newDate = DateTime.local(year, month, date)
				return (
					<button
						type="button"
						className={currentMonth({
							currentDate: sameDay(currentDate, newDate),
						})}
						key={newDate.toString()}
						disabled={isDateDisabled(newDate, preventBefore)}
						onClick={() => setCurrentDate(newDate)}
					>
						{date}
					</button>
				)
			})}
			{nextDates.map((date) => {
				const newDate = DateTime.local(nextMonth.year, nextMonth.month, date)
				return (
					<button
						type="button"
						className={currentMonth({
							currentDate: sameDay(currentDate, newDate),
							month: "previous",
						})}
						key={newDate.toString()}
						disabled={isDateDisabled(newDate, preventBefore)}
						onClick={() => setCurrentDate(newDate)}
					>
						{date}
					</button>
				)
			})}
		</div>
	)
}
