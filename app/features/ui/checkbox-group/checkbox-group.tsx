import { HStack } from "~/styled-system/jsx"
import { Checkbox } from "../checkbox"
import { css } from "~/styled-system/css"
import { SystemStyleObject } from "@pandacss/dev"
import { useField } from "remix-validated-form"

type Props = {
	name: string
	options: { label: string; value: string; defaultChecked?: boolean }[]
	label: string
	css?: SystemStyleObject
	required?: boolean
}

export function CheckboxGroup({
	options,
	label,
	name,
	required = false,
	css: cssProp = {},
}: Props) {
	const group = css(
		{ display: "flex", flexDirection: "column", gap: 1 },
		cssProp,
	)
	const { error, getInputProps } = useField(name)
	return (
		<div role="group" className={group}>
			<legend>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</legend>
			<HStack
				gap={2}
				className={css({
					borderWidth: "1px",
					borderColor: "gray",
					borderRadius: "8px",
					borderStyle: "solid",
					padding: 2,
					shadow: "sm",
					flexWrap: "wrap",
				})}
			>
				{options.map((option, i) => (
					<Checkbox
						key={option.value}
						defaultChecked={option.defaultChecked}
						{...getInputProps({
							id: name,
							label: option.label,
							value: option.value,
						})}
					/>
				))}
			</HStack>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</div>
	)
}
