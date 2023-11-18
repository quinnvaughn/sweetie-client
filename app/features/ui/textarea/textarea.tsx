import { useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	required?: boolean
	name: string
	label: string
	placeholder: string
	rows?: number
}

export function Textarea({
	label,
	name,
	required,
	placeholder,
	rows = 6,
}: Props) {
	const { error, getInputProps } = useField(name)
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
				{...getInputProps({ id: name, placeholder })}
				className={css({
					width: "100%",
					borderRadius: "8px",
					border: "1px solid",
					borderColor: "gray",
					padding: "8px",
					backgroundColor: "white",
					boxShadow: "sm",
				})}
				rows={rows}
				aria-invalid={!!error}
			/>
			{error && <span className={css({ textStyle: "error" })}>{error}</span>}
		</VStack>
	)
}
