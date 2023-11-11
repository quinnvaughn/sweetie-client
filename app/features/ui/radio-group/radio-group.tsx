import { SystemStyleObject } from "@pandacss/dev"
import { match } from "ts-pattern"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	name: string
	options: {
		label: string
		value: string | number
		defaultChecked?: boolean
	}[]
	label: string
	direction?: "row" | "column"
	css?: SystemStyleObject
}

export function RadioGroup({
	name,
	options,
	direction = "row",
	label,
	css: cssProp = {},
}: Props) {
	const group = css(cssProp)
	return (
		<VStack gap={1} alignItems={"flex-start"} className={group}>
			<label htmlFor={name}>{label}</label>
			<div
				className={css({
					borderWidth: "1px",
					borderColor: "gray",
					borderRadius: "8px",
					borderStyle: "solid",
					padding: 2,
				})}
			>
				{match(direction)
					.with("column", () => (
						<VStack gap={4}>
							{options.map((option) => (
								<HStack gap={1} key={option.value}>
									<input
										type="radio"
										id={option.label}
										name={name}
										value={option.value}
										defaultChecked={option.defaultChecked}
									/>
									<label htmlFor={option.label}>{option.label}</label>
								</HStack>
							))}
						</VStack>
					))
					.with("row", () => (
						<HStack gap={4}>
							{options.map((option) => (
								<HStack gap={1} key={option.value}>
									<input
										type="radio"
										id={option.label}
										name={name}
										value={option.value}
										defaultChecked={option.defaultChecked}
									/>
									<label htmlFor={option.label}>{option.label}</label>
								</HStack>
							))}
						</HStack>
					))
					.exhaustive()}
			</div>
		</VStack>
	)
}
