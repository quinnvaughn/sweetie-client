import {
	ArrayPath,
	Control,
	FieldValues,
	Path,
	useController,
	useFieldArray,
	useFormContext,
} from "react-hook-form"
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa/index.js"
import { $path } from "remix-routes"
import { LocationCombobox } from "~/features/location"
import {
	Button,
	HookRadioGroup,
	HookTimePicker,
	TimePicker,
} from "~/features/ui"
import { generateTimeIntervals } from "~/lib"
import { FreeDateFormValues } from "~/routes/free-date.create"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { DateStopOptionForm } from "../date-stop-option-form"

type Props = {
	order: number
	page: "create" | "edit" | "draft"
	id?: string
}

export function OrderedDateStopForm({ order, page, id }: Props) {
	const { control } = useFormContext<FreeDateFormValues>()
	const { move, remove, fields } = useFieldArray({
		control,
		name: "orderedStops",
	})
	const { field: optionalField } = useController({
		name: `orderedStops.${order - 1}.optional`,
		control,
	})
	const { field: estimatedTimeField } = useController({
		name: `orderedStops.${order - 1}.estimatedTime`,
		control,
	})

	const {
		fields: optionsFields,
		append: appendOption,
		move: moveOption,
		remove: removeOption,
	} = useFieldArray({
		control,
		name: `orderedStops.${order - 1}.options`,
	})
	const isFirst = order === 1
	const hasPrevious = order > 1
	const isLast = order === fields.length
	return (
		<VStack gap={4} alignItems="flex-start" width={"100%"}>
			<HStack
				gap={1}
				justifyContent={"space-between"}
				alignItems={"center"}
				width={"100%"}
			>
				<h3
					className={css({
						textStyle: "h1",
						fontSize: { base: "20px", md: "24px" },
						whiteSpace: "nowrap",
						overflowX: "hidden",
						textOverflow: "ellipsis",
					})}
				>
					Date stop {order}
				</h3>
				<HStack gap={{ base: 2, md: 4 }}>
					<HStack gap={2}>
						{hasPrevious && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={() => move(order - 1, order - 2)}
								icon={<FaArrowUp className={css({ color: "black" })} />}
							/>
						)}
						{!isLast && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={() => move(order - 1, order)}
								icon={<FaArrowDown className={css({ color: "black" })} />}
							/>
						)}
					</HStack>
					{!isFirst && (
						<Button
							size="sm"
							variant="black"
							visual="outlined"
							onClick={() => remove(order - 1)}
							icon={<FaTrash className={css({ color: "black" })} />}
						/>
					)}
				</HStack>
			</HStack>
			<HookRadioGroup
				{...optionalField}
				label="Is this stop optional? (i.e. by default, not selected)"
				options={[
					{ label: "Yes", value: "true" },
					{ label: "No", value: "false" },
				]}
				control={control}
				required
			/>
			<HookTimePicker
				{...estimatedTimeField}
				label="How much time should the user spend at this stop? (hours:minutes)"
				options={generateTimeIntervals("00:15", "10:00", 15)}
				required
				control={control}
				defaultValue={estimatedTimeField.value}
			/>
			<VStack gap={4} width={"100%"}>
				{optionsFields.map((o, index) => (
					<DateStopOptionForm
						locationPath={
							page === "create"
								? $path("/free-date/create/add-location/:stop/:option", {
										stop: order,
										option: o.optionOrder,
								  })
								: page === "edit"
								? $path("/free-date/edit/:id/add-location/:stop/:option", {
										stop: order,
										option: o.optionOrder,
										id: id as string,
								  })
								: $path("/free-date/draft/:id/add-location/:stop/:option", {
										stop: order,
										option: o.optionOrder,
										id: id as string,
								  })
						}
						control={control}
						fields={{
							content: `orderedStops.${order - 1}.options.${index}.content`,
							title: `orderedStops.${order - 1}.options.${index}.title`,
							location: {
								id: `orderedStops.${order - 1}.options.${index}.location.id`,
								name: `orderedStops.${
									order - 1
								}.options.${index}.location.name`,
							},
						}}
						onMoveOptionDown={() => moveOption(index, index + 1)}
						onMoveOptionUp={() => moveOption(index, index - 1)}
						onRemoveOption={() => removeOption(index)}
						hasPrevious={index > 0}
						isFirst={index === 0}
						isLast={index === optionsFields.length - 1}
						onAddOption={() =>
							appendOption({
								title: "",
								content: "",
								location: { id: "", name: "" },
								optionOrder: optionsFields.length + 1,
							})
						}
						key={o.id}
						optionOrder={index + 1}
					/>
				))}
			</VStack>
		</VStack>
	)
}
