import { DateTime } from "luxon"
import { useRef, useState } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { HookTimePicker, TimePicker } from "~/features/ui"
import { generateTwentyFourHours } from "~/lib"
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

type DisplayedTime = {
	text: string
	value: string
	tab: number
}

type Props<TFormValues extends FieldValues> = {
	control: Control<TFormValues>
	name: Path<TFormValues>
	label: string
	required?: boolean
	otherValue?: string
	defaultDisplayedTimes?: DisplayedTime[]
}

export function HookRecommendedTimePicker<TFormValues extends FieldValues>({
	name,
	label,
	required,
	otherValue = "12:00 PM",
	defaultDisplayedTimes,
	control,
}: Props<TFormValues>) {
	const { field } = useController({ name, control })
	// recommendedTime is in the format of "HH:MM AM/PM"
	// remove the AM/PM
	const defaultValue = useRef(field.value).current
	const [time, amPM] = defaultValue.split(" ")
	const [hour, minute] = time.split(":")
	const formattedDate = DateTime.now().set({
		hour:
			amPM === "PM" && Number(hour) !== 12 ? Number(hour) + 12 : Number(hour),
		minute: Number(minute),
	})

	const displayedTimes = defaultDisplayedTimes
		? [
				...defaultDisplayedTimes,
				{
					value: defaultDisplayedTimes.some((dt) => dt.value === defaultValue)
						? otherValue
						: defaultValue,
					tab: 3,
					text: "Other",
				},
		  ]
		: [
				{
					text: formattedDate
						.minus({ minutes: 30 })
						.toLocaleString(DateTime.TIME_SIMPLE),
					value: formattedDate
						.minus({ minutes: 30 })
						.toLocaleString(DateTime.TIME_SIMPLE),
					tab: 0,
				},
				{
					text: formattedDate.toLocaleString(DateTime.TIME_SIMPLE),
					value: formattedDate.toLocaleString(DateTime.TIME_SIMPLE),
					tab: 1,
				},
				{
					text: formattedDate
						.plus({ minutes: 30 })
						.toLocaleString(DateTime.TIME_SIMPLE),
					value: formattedDate
						.plus({ minutes: 30 })
						.toLocaleString(DateTime.TIME_SIMPLE),
					tab: 2,
				},
				{ value: otherValue, tab: 3, text: "Other" },
		  ]

	const [activeTab, setActiveTab] = useState(
		displayedTimes.some((dt) => dt.value === defaultValue)
			? displayedTimes.findIndex((time) => time.value === defaultValue)
			: 3,
	)

	function onClickTab(tab: number, time: string) {
		setActiveTab(tab)
		field.onChange(time)
	}

	return (
		<VStack gap={1} alignItems={"flex-start"} width={"100%"}>
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
						key={time.text}
						active={activeTab === time.tab}
						value={time.text}
						onSelect={() => onClickTab(time.tab, time.value)}
					/>
				))}
			</div>
			{activeTab === 3 && (
				<HookTimePicker
					control={control}
					defaultValue={displayedTimes[3].value}
					name={name}
					label={""}
					required={false}
					options={generateTwentyFourHours()}
				/>
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
