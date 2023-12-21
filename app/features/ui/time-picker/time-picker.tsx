import { useEffect, useRef, useState } from "react"
import { useField } from "remix-validated-form"
import { css, cva } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

const input = cva({
	base: {
		border: "1px solid",
		borderColor: "gray",
		borderRadius: "8px",
		padding: "8px",
		width: "75px",
		textAlign: "right",
		shadow: "sm",
		"&[type=number]": {
			appearance: "textfield",
		},
		"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
			WebkitAppearance: "none",
			margin: 0,
		},
	},
	variants: {
		focused: {
			true: {
				outline: "1px auto -webkit-focus-ring-color",
			},
			false: {
				outline: "none",
			},
		},
		error: {
			true: {
				border: "1px solid red !important",
			},
		},
	},
})

const toggle = cva({
	base: {
		borderRadius: "4px",
		padding: "8px",
		cursor: "pointer",
	},
	variants: {
		active: {
			true: {
				backgroundColor: "secondary",
				border: "1px solid transparent",
				color: "white",
			},
			false: {
				backgroundColor: "white",
				border: "1px solid",
				borderColor: "secondary",
				color: "secondary",
			},
		},
	},
})

type Props = {
	label: string
	required?: boolean
	name: string
	time?: {
		hours: string
		minutes: string
		amPm: "AM" | "PM"
	}
}

export default function TimePicker({ label, required, time, name }: Props) {
	const [hours, setHours] = useState(time?.hours || "")
	const [minutes, setMinutes] = useState(time?.minutes || "")
	const [amPm, setAmPm] = useState<"AM" | "PM">(time?.amPm || "PM")
	const minuteRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState<string>("")
	const { getInputProps, error, validate } = useField(name)

	const [focused, setFocused] = useState<"hours" | "minutes" | null>(null)

	function changeHour(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value !== "" && Number.isNaN(Number(e.target.value))) {
			return
		}
		if (
			Number(e.target.value) > 12 ||
			(Number(e.target.value) < 1 && e.target.value !== "")
		) {
			return
		}
		setHours(e.target.value)
		// if the number starts with anything higher than 1, we want to focus on the minutes
		if (e.target.value.length === 1 && Number(e.target.value) > 1) {
			minuteRef.current?.focus()
			minuteRef.current?.setSelectionRange(0, minutes.length)
			setFocused("minutes")
		}
		// If the number is 10, 11, or 12, we want to focus on the minutes
		if (e.target.value.length === 2) {
			minuteRef.current?.focus()
			minuteRef.current?.setSelectionRange(0, minutes.length)
			setFocused("minutes")
		}
	}

	function changeMins(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value !== "" && Number.isNaN(Number(e.target.value))) {
			return
		}
		if (Number(e.target.value) > 59 || Number(e.target.value) < 0) {
			return
		}
		setMinutes(e.target.value)
	}

	useEffect(() => {
		if (hours === "" || minutes === "") {
			return
		}
		if (Number(hours) > 12 || Number(hours) < 1) {
			return
		}
		if (Number(minutes) > 59 || Number(minutes) < 0) {
			return
		}
		if (minutes.length === 1) {
			setValue("")
			return
		}
		setValue(`${hours}:${minutes} ${amPm}`)
	}, [hours, minutes, amPm])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (value === "") {
			return
		}
		validate()
	}, [value])

	return (
		<VStack
			gap={1}
			alignItems="flex-start"
			justifyContent={"flex-start"}
			width="100%"
		>
			<label className={css({ textStyle: "paragraph" })}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<HStack gap={2} alignItems="center">
				<input
					className={input({ focused: focused === "hours", error: !!error })}
					type="text"
					inputMode="numeric"
					placeholder="6"
					min={1}
					max={12}
					onFocus={() => {
						setFocused("hours")
					}}
					onBlur={() => {
						setFocused(null)
					}}
					value={hours}
					onChange={changeHour}
				/>
				<p className={css({ textStyle: "paragraph", fontSize: "20px" })}>:</p>
				<input
					className={input({ focused: focused === "minutes", error: !!error })}
					type="text"
					inputMode="numeric"
					placeholder="00"
					ref={minuteRef}
					min={0}
					max={59}
					onFocus={() => {
						setFocused("minutes")
					}}
					onBlur={() => {
						setFocused(null)
					}}
					value={minutes}
					onChange={changeMins}
				/>
				<button
					className={toggle({ active: amPm === "AM" })}
					type="button"
					onClick={() => setAmPm("AM")}
				>
					AM
				</button>
				<button
					className={toggle({ active: amPm === "PM" })}
					type="button"
					onClick={() => setAmPm("PM")}
				>
					PM
				</button>
			</HStack>
			{error && <span className={css({ textStyle: "error" })}>{error}</span>}
			<input {...getInputProps()} type="hidden" name={name} value={value} />
		</VStack>
	)
}
