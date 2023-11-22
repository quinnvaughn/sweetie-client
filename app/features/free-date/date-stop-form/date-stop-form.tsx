import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa/index.js"
import { LocationCombobox } from "~/features/location"
import { Button, Input, Textarea } from "~/features/ui"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	index: number
	isFirst: boolean
	isLast: boolean
	isLengthMoreThanOne: boolean
	remove: () => void
	onMoveUp: () => void
	onMoveDown: () => void
	locationPath: string
	fields: {
		title: string
		content: string
		location: {
			id: string
			name: string
		}
	}
}

export function DateStopForm({
	index,
	isFirst,
	isLengthMoreThanOne,
	isLast,
	remove,
	fields: { title, content, location },
	onMoveDown,
	onMoveUp,
	locationPath,
}: Props) {
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
					Date stop {index + 1}
				</h3>
				<HStack gap={{ base: 2, md: 4 }}>
					<HStack gap={2}>
						{!isFirst && isLengthMoreThanOne && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onMoveUp}
								icon={<FaArrowUp className={css({ color: "black" })} />}
							/>
						)}
						{!isLast && (
							<Button
								size="sm"
								variant="black"
								visual="outlined"
								onClick={onMoveDown}
								icon={<FaArrowDown className={css({ color: "black" })} />}
							/>
						)}
					</HStack>
					{!isFirst && (
						<Button
							size="sm"
							variant="black"
							visual="outlined"
							onClick={remove}
							icon={<FaTrash className={css({ color: "black" })} />}
						/>
					)}
				</HStack>
			</HStack>
			<VStack gap={4} width={"100%"}>
				<Input
					required
					name={title}
					label="Title"
					placeholder="Enter a title that is short and sweet"
				/>
				<LocationCombobox
					required
					label="Select a location"
					fields={location}
					locationPath={locationPath}
				/>
				<Textarea
					required
					name={content}
					label="Content"
					placeholder="We want you to be as opinionated as possible. What should you order? What should you get to drink? Where should you park? We want you to curate the experience as much as possible."
				/>
			</VStack>
		</VStack>
	)
}
