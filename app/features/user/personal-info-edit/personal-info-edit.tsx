import { useEffect, useState } from "react"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

type Props = {
	label: string
	value: string
	editDescription: string
	input: React.ReactNode
	fieldName: string
	close: boolean
}

export function PersonalInfoEdit({
	label,
	value,
	editDescription,
	input,
	fieldName,
	close,
}: Props) {
	const [isEdit, setIsEdit] = useState(false)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!close) return
		setIsEdit(false)
	}, [close, value])

	return (
		<VStack
			gap={4}
			borderBottom={"1px solid"}
			borderBottomColor={"gray"}
			paddingY={"20px"}
			alignItems={"flex-start"}
			width={"100%"}
		>
			<HStack
				gap={4}
				justifyContent="space-between"
				alignItems="flex-start"
				width={"100%"}
			>
				<VStack gap={1} alignItems="flex-start" width={"100%"}>
					<label className={css({ textStyle: "paragraph" })}>{label}</label>
					<p
						className={css({
							textStyle: "paragraph",
							fontSize: "14px",
							color: "grayText",
						})}
					>
						{isEdit ? editDescription : value}
					</p>
				</VStack>
				<button
					className={css({
						fontWeight: "bold",
						textDecoration: "underline",
						textStyle: "paragraph",
						cursor: "pointer",
					})}
					type="button"
					onClick={() => {
						isEdit ? setIsEdit(false) : setIsEdit(true)
					}}
				>
					{isEdit ? "Cancel" : "Edit"}
				</button>
			</HStack>
			{isEdit && input}
			{isEdit && (
				<button
					type="submit"
					name="fieldUpdated"
					value={fieldName}
					className={button({ variant: "black" })}
				>
					Save
				</button>
			)}
		</VStack>
	)
}
