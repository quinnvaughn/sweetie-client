import { ComponentProps } from "react"
import { useControlField, useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { Checkbox, Input } from ".."

type Props = {
	checkboxName: string
	checkboxLabel: string
	inputs: ComponentProps<typeof Input>[]
}

export function CheckboxAndInputs({
	checkboxName,
	inputs,
	checkboxLabel,
}: Props) {
	const { error } = useField(checkboxName)
	const [value, setValue] = useControlField<boolean>(checkboxName)

	return (
		<>
			<HStack justifyContent="flex-start" width={"100%"}>
				<Checkbox
					name={checkboxName}
					label={checkboxLabel}
					value={String(value)}
					onChange={(e) => setValue(e.target.checked)}
				/>
			</HStack>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
			{value && inputs.map((input) => <Input key={input.name} {...input} />)}
		</>
	)
}
