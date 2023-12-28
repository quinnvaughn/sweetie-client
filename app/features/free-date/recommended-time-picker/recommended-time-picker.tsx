import { DateTime } from "luxon"
import { useRef, useState } from "react"
import { useControlField } from "remix-validated-form"
import { TimePicker } from "~/features/ui"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const tabStyle = cva({
	base: {
		padding: "8px 12px",
		borderRadius: "100px",
		fontSize: "14px",
		flex: 1,
		textAlign: "center",
		fontWeight: "500",
	},
	variants: {
		active: {
			true: {
				backgroundColor: "white",
				border: "1px solid",
				borderColor: "gray",
				cursor: "default",
			},
			false: {
				_hover: {
					cursor: "pointer",
					backgroundColor: "gray",
				},
			},
		},
	},
})

type Props = {
	name: string
	label: string
	required?: boolean
}

export function RecommendedTimePicker({ name, label, required }: Props) {
	const [recommendedTime, setRecommendedTime] = useControlField<string>(name)
	// recommendedTime is in the format of "HH:MM AM/PM"
	// remove the AM/PM
	const defaultValue = useRef(recommendedTime).current
	const [time, amPM] = defaultValue.split(" ")
	const [hour, minute] = time.split(":")
	const formattedDate = new Date()
	formattedDate.setHours(
		amPM === "PM" ? Number(hour) + 12 : Number(hour),
		Number(minute),
	)
	const [activeTab, setActiveTab] = useState(1)
	const displayedTimes = [
		{
			value: DateTime.fromJSDate(formattedDate)
				.minus({ minutes: 30 })
				.toLocaleString(DateTime.TIME_SIMPLE),
			tab: 0,
		},
		{
			value: DateTime.fromJSDate(formattedDate).toLocaleString(
				DateTime.TIME_SIMPLE,
			),
			tab: 1,
		},
		{
			value: DateTime.fromJSDate(formattedDate)
				.plus({ minutes: 30 })
				.toLocaleString(DateTime.TIME_SIMPLE),
			tab: 2,
		},
		{ value: "Other", tab: 3 },
	]

	function onClickTab(tab: number, time: string) {
		setActiveTab(tab)
		setRecommendedTime(time)
	}

	return (
		<VStack alignItems={"flex-start"} width={"100%"}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<div
				className={css({
					backgroundColor: "#EBEBEB",
					borderRadius: "100px",
					display: "flex",
					width: "100%",
					padding: "2px",
				})}
			>
				{displayedTimes.map((time) => (
					<Tab
						key={time.value}
						active={activeTab === time.tab}
						value={time.value}
						onSelect={() => onClickTab(time.tab, time.value)}
					/>
				))}
			</div>
			{activeTab === 3 && (
				<TimePicker name={name} label={""} required={false} />
			)}
			{!(activeTab === 3) && (
				<input type="hidden" name={name} value={recommendedTime} />
			)}
		</VStack>
	)
}

type TabProps = {
	active: boolean
	value: string
	onSelect: () => void
}

function Tab({ active, value, onSelect }: TabProps) {
	return (
		<button type="button" className={tabStyle({ active })} onClick={onSelect}>
			{value}
		</button>
	)
}
