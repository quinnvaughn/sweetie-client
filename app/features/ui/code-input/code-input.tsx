import { Control, FieldValues, Path, useController } from "react-hook-form"
import { useFieldTimeout } from "~/hooks"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props<T extends FieldValues> = {
	control: Control<T>
	name: Path<T>
	numDigits: number
	label?: string
}

export function CodeInput<T extends FieldValues>({
	control,
	name,
	numDigits,
	label = "Enter code",
}: Props<T>) {
	const [error, setError] = useFieldTimeout(false)
	const { field } = useController({
		name,
		control,
	})

	// map over numDigits to create input fields
	return (
		<VStack gap={2}>
			<label htmlFor={name} className={css({ fontWeight: "bold" })}>
				{label}
			</label>
			<HStack gap={2}>
				{Array.from({ length: numDigits }, (_, i) => (
					<input
						value={field.value[i] || ""}
						key={`${name}[${i}]`}
						onPaste={(e) => {
							const getValue = e.clipboardData.getData("text")
							if (getValue.length !== numDigits) {
								setError(true)
								e.preventDefault()
								return false
							}
							const newValue = getValue.split("")
							field.onChange(newValue.join(""))
							// blur input
							e.currentTarget.blur()
						}}
						onChange={(e) => {
							// set digit in state ie _ _ B _ _
							const value = e.target.value
							const newValue = field.value.split("")
							newValue[i] = value
							field.onChange(newValue.join(""))
							// if last input, blur and not a backspace
							if (i === numDigits - 1 && value !== "") {
								e.target.blur()
								field.onBlur()
								return
							}
							// focus next input
							if (value !== "") {
								const nextInput = e.target
									.nextElementSibling as HTMLInputElement
								nextInput.focus()
							}
						}}
						type="text"
						maxLength={1}
						className={css({
							borderBottom: "1px solid",
							borderBottomColor: "gray",
							maxWidth: "2em",
							width: "100%",
							textAlign: "center",
							textTransform: "uppercase",
							height: "2em",
						})}
					/>
				))}
			</HStack>
			{error && (
				<p className={css({ color: "red" })}>
					Please paste a {numDigits} digit number.
				</p>
			)}
		</VStack>
	)
}
