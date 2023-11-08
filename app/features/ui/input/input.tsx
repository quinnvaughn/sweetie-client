import { useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	name: string
	label: string
	required?: boolean
	placeholder?: string
	type?: string
	value?: string
}

export function Input({
	name,
	label,
	required,
	placeholder,
	type,
	value,
}: Props) {
	const { error, getInputProps } = useField(name)
	return (
		<VStack gap={2} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<input
				{...getInputProps()}
				placeholder={placeholder}
				className={css({
					width: "100%",
					borderRadius: "8px",
					border: "1px solid",
					borderColor: "gray",
					padding: "8px",
				})}
				type={type}
				name={name}
				value={value}
			/>
			{error && (
				<span className={css({ color: "red", fontSize: "12px" })}>{error}</span>
			)}
		</VStack>
	)
}
