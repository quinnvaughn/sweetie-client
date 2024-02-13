import { Control, FieldValues, Path, useController } from "react-hook-form"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const textAreaStyle = cva({
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
	required?: boolean
	control: Control<TFormValues>
	name: Path<TFormValues>
	label: string
	placeholder: string
	rows?: number
}

export function HookTextarea<TFormValues extends FieldValues>({
	name,
	control,
	required,
	placeholder,
	rows,
	label,
}: Props<TFormValues>) {
	const { field, fieldState } = useController({ name, control })
	const { error } = fieldState
	return (
		<VStack
			gap={1}
			alignItems="flex-start"
			justifyContent={"flex-start"}
			aria-live="polite"
			width={"100%"}
		>
			<label htmlFor={name} className={css({ textStyle: "paragraph" })}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<textarea
				{...field}
				name={name}
				placeholder={placeholder}
				className={textAreaStyle({ error: !!error?.message })}
				rows={rows}
				aria-invalid={!!error?.message}
			/>
			{error && (
				<span className={css({ textStyle: "error" })}>{error.message}</span>
			)}
		</VStack>
	)
}
