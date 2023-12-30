import { useSelect } from "downshift"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa/index.js"
import { useControlField, useField } from "remix-validated-form"
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
	}
}

export default function TimePicker({ label, required, time, name }: Props) {
	const [hours, setHours] = useState(time?.hours || "12")
	const [minutes, setMinutes] = useState(time?.minutes || "00")
	const [amPm, setAmPm] = useState<"AM" | "PM">(
		time?.hours ? (time.hours > "12" ? "PM" : "AM") : "PM",
	)
	const [value, setValue] = useControlField<string>(name)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setValue(`${hours}:${minutes} ${amPm}`)
	}, [hours, minutes, amPm])

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
			<HStack gap={1} justifyContent={"flex-start"}>
				<Select
					onChange={setHours}
					options={Array.from({ length: 12 }, (_, i) =>
						i + 1 < 10 ? `0${i + 1}` : (i + 1).toString(),
					)}
					defaultValue={hours}
				/>
				<Select
					onChange={setMinutes}
					options={Array.from({ length: 12 }, (_, i) =>
						i * 5 < 10 ? `0${i * 5}` : (i * 5).toString(),
					)}
					defaultValue={minutes}
				/>
				<Select
					onChange={(value) => setAmPm(value as "AM" | "PM")}
					options={["AM", "PM"]}
					defaultValue={amPm}
				/>
			</HStack>
			<input type="hidden" name={name} value={value} />
		</VStack>
	)
}

type SelectProps = {
	onChange: (item: string) => void
	options: string[]
	defaultValue: string
}

const dropdownItem = cva({
	base: {
		paddingY: "8px",
		paddingX: "12px",
		display: "flex",
		flexDirection: "column",
		cursor: "pointer",
		justifyContent: "center",
		alignItems: "center",
	},
	variants: {
		highlighted: {
			true: {
				backgroundColor: "rgb(232, 232, 232)",
			},
		},
		selected: {
			true: {
				fontWeight: "bold",
			},
		},
	},
})

function Select({ onChange, options, defaultValue }: SelectProps) {
	const {
		isOpen,
		selectedItem,
		getToggleButtonProps,
		getItemProps,
		getMenuProps,
		highlightedIndex,
	} = useSelect({
		items: options,
		defaultSelectedItem: defaultValue,
		onSelectedItemChange: ({ selectedItem }) => {
			if (selectedItem) {
				onChange(selectedItem)
			}
		},
	})

	return (
		<div>
			<div
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: 1,
					width: "60px",
					position: "relative",
				})}
			>
				<div
					className={css({
						padding: "8px",
						backgroundColor: "white",
						justifyContent: "space-between",
						cursor: "pointer",
						border: "1px solid",
						borderColor: "gray",
						borderRadius: "4px",
						display: "flex",
						alignItems: "center",
						gap: 1,
					})}
					{...getToggleButtonProps()}
				>
					<span>{selectedItem}</span>
					{isOpen ? (
						<FaChevronUp className={css({ color: "black" })} size={14} />
					) : (
						<FaChevronDown className={css({ color: "black" })} size={14} />
					)}
				</div>
			</div>
			<ul
				className={css({
					position: "absolute",
					backgroundColor: "white",
					boxShadow: "md",
					maxHeight: { base: "100px", md: "200px" },
					overflowY: "scroll",
					overflowX: "hidden",
					padding: "0px",
					zIndex: 10,
					width: "60px",
					borderRadius: "4px",
					scrollbar: "hidden",
				})}
				{...getMenuProps()}
			>
				{isOpen &&
					options.map((item, index) => (
						<li
							className={dropdownItem({
								highlighted: highlightedIndex === index,
								selected: selectedItem === item,
							})}
							key={item}
							{...getItemProps({ item, index })}
						>
							<span>{item}</span>
						</li>
					))}
			</ul>
		</div>
	)
}
