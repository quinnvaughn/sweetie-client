import { useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type MyInputProps = {
	name: string
	label: string
	required?: boolean
	placeholder?: string
	type?: string
}

export function Input({
	name,
	label,
	required,
	placeholder,
	type,
}: MyInputProps) {
	const { error, getInputProps } = useField(name)
	return (
		<VStack gap={2} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				{label} {required && <span>*</span>}
			</label>
			<input
				{...getInputProps({ id: name })}
				placeholder={placeholder}
				className={css({
					width: "100%",
					borderRadius: "4px",
					border: "1px solid #ccc",
					padding: "8px",
				})}
				type={type}
			/>
			{error && (
				<span className={css({ color: "red", fontSize: "12px" })}>{error}</span>
			)}
		</VStack>
	)
}
