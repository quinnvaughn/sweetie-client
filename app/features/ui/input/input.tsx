import { useField } from "remix-validated-form"
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

type Props = {
	name: string
	label: string
	required?: boolean
	placeholder?: string
	type?: string
	autoComplete?: string
}

export function Input({
	name,
	label,
	required,
	placeholder,
	type,
	autoComplete,
}: Props) {
	const { error, getInputProps } = useField(name)
	return (
		<VStack gap={1} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<input
				{...getInputProps({ id: name, autoComplete })}
				placeholder={placeholder}
				className={inputStyle({ error: !!error })}
				name={name}
				type={type}
			/>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</VStack>
	)
}
