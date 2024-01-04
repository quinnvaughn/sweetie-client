import { DateTime } from "luxon"
import { useControlField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { Select } from ".."

type Props = {
	label: string
	required?: boolean
	name: string
	defaultValue?: string
	options: string[]
}

export default function TimePicker({
	label,
	required,
	defaultValue = "12:00 PM",
	name,
	options,
}: Props) {
	const [value, setValue] = useControlField<string>(name)

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
			<Select
				onChange={setValue}
				defaultValue={defaultValue}
				options={options}
			/>
			<input type="hidden" name={name} value={value} />
		</VStack>
	)
}
