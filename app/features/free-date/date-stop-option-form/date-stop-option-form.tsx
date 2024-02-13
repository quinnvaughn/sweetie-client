import { Control, FieldValues, Path, useController } from "react-hook-form"
import {
	FaArrowDown,
	FaArrowUp,
	FaPlus,
	FaTrash,
} from "react-icons/fa6/index.js"
import { HookLocationCombobox } from "~/features/location"
import { Button, HookInput, HookTextarea } from "~/features/ui"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props<TFormValues extends FieldValues> = {
	locationPath: string
	optionOrder: number
	control: Control<TFormValues>
	fields: {
		title: Path<TFormValues>
		content: Path<TFormValues>
		location: {
			id: Path<TFormValues>
			name: Path<TFormValues>
		}
	}
	onMoveOptionUp: () => void
	onMoveOptionDown: () => void
	onAddOption: () => void
	onRemoveOption: () => void
	isFirst: boolean
	isLast: boolean
	hasPrevious: boolean
}

export function DateStopOptionForm<TFormValues extends FieldValues>({
	optionOrder,
	control,
	isFirst,
	isLast,
	onAddOption,
	fields,
	hasPrevious,
	onMoveOptionDown,
	onMoveOptionUp,
	onRemoveOption,
	locationPath,
}: Props<TFormValues>) {
	const { field: titleField } = useController({
		name: fields.title,
		control,
	})
	const { field: contentField } = useController({
		name: fields.content,
		control,
	})
	const { field: locationIdField } = useController({
		name: fields.location.id,
		control,
	})
	const { field: locationNameField } = useController({
		name: fields.location.name,
		control,
	})
	return (
		<VStack width={"100%"} alignItems={"flex-start"}>
			<HStack gap={1} justifyContent={"space-between"} width={"100%"}>
				<h4
					className={css({
						textStyle: "h4",
						fontSize: "20px",
						fontWeight: "500",
					})}
				>
					Option {optionOrder}
				</h4>
				<HStack gap={{ base: isFirst ? 0 : 2, md: isFirst ? 0 : 4 }}>
					<HStack gap={2}>
						{hasPrevious && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onMoveOptionUp}
								icon={<FaArrowUp className={css({ color: "black" })} />}
							/>
						)}
						{!isLast && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onMoveOptionDown}
								icon={<FaArrowDown className={css({ color: "black" })} />}
							/>
						)}
					</HStack>
					<HStack gap={2}>
						{isLast && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onAddOption}
								icon={<FaPlus className={css({ color: "black" })} />}
							/>
						)}
						{!isFirst && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onRemoveOption}
								icon={<FaTrash className={css({ color: "black" })} />}
							/>
						)}
					</HStack>
				</HStack>
			</HStack>
			<HookInput
				{...titleField}
				control={control}
				label="Title"
				placeholder="Let the user know what the stop is going to be about"
			/>
			<HookLocationCombobox
				locationPath={locationPath}
				control={control}
				label="Location"
				fields={{
					id: locationIdField.name,
					name: locationNameField.name,
				}}
			/>
			<HookTextarea
				{...contentField}
				rows={8}
				control={control}
				label="Content"
				placeholder="We want you to be as opinionated as possible. What should you order? What should you get to drink? Where should you park? We want you to curate the experience as much as possible."
			/>
		</VStack>
	)
}
