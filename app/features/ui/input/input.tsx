import { useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	name: string
	label: string
	required?: boolean
	placeholder?: string
	type?: string
	defaultValue?: string
}

export function Input({ name, label, required, placeholder, type }: Props) {
	const { error, getInputProps } = useField(name)

	return (
		<VStack gap={1} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<input
				{...getInputProps({ id: name })}
				placeholder={placeholder}
				className={css({
					width: "100%",
					borderRadius: "8px",
					border: "1px solid",
					borderColor: "gray",
					padding: "8px",
					shadow: "sm",
				})}
				name={name}
				type={type}
			/>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</VStack>
	)
}
