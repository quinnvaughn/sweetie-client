import { forwardRef } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const inputStyle = cva({
	base: {
		width: "100%",
		borderRadius: "8px",
		border: "1px solid",
		borderColor: "gray",
		padding: "8px",
		backgroundColor: "white",
		boxShadow: "sm",
	},
	variants: {
		error: {
			true: {
				border: "1px solid red !important",
			},
		},
	},
})

type Props<TFormValues extends FieldValues> = {
	name: Path<TFormValues>
	label: string
	required?: boolean
	placeholder?: string
	type?: string
	autoComplete?: string
	control: Control<TFormValues>
}

export function HookInput<TFormValues extends FieldValues>({
	name,
	label,
	required,
	placeholder,
	type,
	autoComplete,
	control,
}: Props<TFormValues>) {
	const { field, fieldState } = useController({
		name,
		control,
	})
	const { error } = fieldState
	return (
		<VStack gap={1} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<input
				{...field}
				autoComplete={autoComplete}
				placeholder={placeholder}
				className={inputStyle({ error: !!error?.message })}
				name={name}
				type={type}
			/>
			{fieldState.error && (
				<p className={css({ textStyle: "error" })}>
					{fieldState.error.message}
				</p>
			)}
		</VStack>
	)
}
