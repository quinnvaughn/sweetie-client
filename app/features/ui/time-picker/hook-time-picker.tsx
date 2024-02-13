import { Control, FieldValues, Path, useController } from "react-hook-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { Select } from ".."

type Props<TFormValues extends FieldValues> = {
	label: string
	required?: boolean
	name: Path<TFormValues>
	defaultValue?: string
	options: string[]
	control: Control<TFormValues>
}

export function HookTimePicker<TFormValues extends FieldValues>({
	label,
	required,
	defaultValue = "12:00 PM",
	name,
	options,
	control,
}: Props<TFormValues>) {
	const { field } = useController({ name, control })
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
				onChange={field.onChange}
				defaultValue={defaultValue}
				options={options}
			/>
		</VStack>
	)
}
