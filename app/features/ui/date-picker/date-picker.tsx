import Calendar from "./calendar"
import { useOutsideClick } from "~/hooks"
import { getNumberSuffix } from "~/lib"
import { DateTime } from "luxon"
import { useState } from "react"
import { FaCalendarDay } from "react-icons/fa/index.js"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

const invisibleButton = css({
	backgroundColor: "transparent",
	border: 0,
	padding: 0,
	cursor: "pointer",
	color: "black",
})

type Props = {
	date?: DateTime
	label: string
	required?: boolean
	preventBefore?: DateTime
	name: string
}

export default function DateTimePicker({
	date,
	label,
	required,
	name,
	preventBefore,
}: Props) {
	const [currentDate, setCurrentDate] = useState<DateTime>(
		date || DateTime.now(),
	)
	const [showDateSelector, setShowDateSelector] = useState(false)

	const containerRef = useOutsideClick<HTMLDivElement>(() =>
		setShowDateSelector(false),
	)

	function toggleCalendar() {
		setShowDateSelector((prev) => !prev)
	}

	return (
		<VStack
			gap={2}
			alignItems="flex-start"
			justifyContent="flex-start"
			width="100%"
		>
			<label className={css({ textStyle: "paragraph" })}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<div
				className={css({
					border: "1px solid",
					borderColor: "gray",
					borderRadius: "8px",
					padding: "8px",
					position: "relative",
					width: "100%",
					shadow: "sm",
				})}
				ref={containerRef}
			>
				<HStack gap={2} justifyContent="space-between" alignItems="center">
					<button
						className={invisibleButton}
						type="button"
						onClick={toggleCalendar}
					>
						{currentDate.toFormat("EEEE, MMMM d") +
							getNumberSuffix(currentDate.day)}
					</button>
					<button
						className={invisibleButton}
						type="button"
						onClick={toggleCalendar}
					>
						<FaCalendarDay size={16} className={css({ color: "secondary" })} />
					</button>
				</HStack>
				{showDateSelector && (
					<Calendar
						preventBefore={preventBefore}
						date={currentDate}
						setCurrentDate={(date) => {
							setShowDateSelector(false)
							setCurrentDate(date)
						}}
					/>
				)}
				<div className={css({ width: 0, overflow: "hidden", height: 0 })}>
					<input
						name={name}
						onChange={() => {}}
						value={currentDate.toISODate() as string}
					/>
				</div>
			</div>
		</VStack>
	)
}
