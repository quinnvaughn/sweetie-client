import { SystemStyleObject } from "@pandacss/dev"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { match } from "ts-pattern"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props<TFormValues extends FieldValues> = {
	name: Path<TFormValues>
	control: Control<TFormValues>
	options: {
		label: string
		value: string | number
	}[]
	label: string
	direction?: "row" | "column"
	css?: SystemStyleObject
	required?: boolean
}

export function HookRadioGroup<TFormValues extends FieldValues>({
	name,
	options,
	direction = "row",
	label,
	required = false,
	css: cssProp = {},
	control,
}: Props<TFormValues>) {
	const group = css(cssProp)
	const { field } = useController({ name, control })
	return (
		<VStack gap={1} alignItems={"flex-start"} className={group}>
			<label htmlFor={name}>
				{label}{" "}
				{required && <span className={css({ textStyle: "error" })}>*</span>}
			</label>
			<div
				className={css({
					borderWidth: "1px",
					borderColor: "gray",
					borderRadius: "8px",
					borderStyle: "solid",
					padding: 2,
					shadow: "sm",
				})}
			>
				{match(direction)
					.with("column", () => (
						<VStack gap={4}>
							{options.map((option) => (
								<HStack gap={1} key={option.value}>
									<input
										{...field}
										type="radio"
										id={option.label}
										name={name}
										value={option.value}
										checked={field.value === option.value}
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
										{...field}
										type="radio"
										id={option.label}
										name={name}
										value={option.value}
										checked={field.value === option.value}
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
