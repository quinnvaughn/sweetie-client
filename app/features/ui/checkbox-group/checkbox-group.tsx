import { HStack } from "~/styled-system/jsx"
import { Checkbox } from "../checkbox"
import { css } from "~/styled-system/css"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	name: string
	options: { label: string; value: string; defaultChecked?: boolean }[]
	label: string
	css?: SystemStyleObject
}

export function CheckboxGroup({
	options,
	label,
	name,
	css: cssProp = {},
}: Props) {
	const group = css(
		{ display: "flex", flexDirection: "column", gap: 1, flexWrap: "wrap" },
		cssProp,
	)
	return (
		<div role="group" className={group}>
			<legend>{label}</legend>
			<HStack
				gap={2}
				className={css({
					borderWidth: "1px",
					borderColor: "gray",
					borderRadius: "8px",
					borderStyle: "solid",
					padding: 2,
				})}
			>
				{options.map((option) => (
					<Checkbox key={option.value} {...option} name={name} />
				))}
			</HStack>
		</div>
	)
}
