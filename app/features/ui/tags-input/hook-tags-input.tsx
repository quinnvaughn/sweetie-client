import {
	Control,
	FieldValues,
	Path,
	useController,
	useFieldArray,
} from "react-hook-form"
import { FiPlus, FiX } from "react-icons/fi/index.js"
import { useRemixFormContext } from "remix-hook-form"
import { CreateFreeDateFormValues } from "~/forms"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	label: string
}

export function HookTagsInput({ label }: Props) {
	const { control } = useRemixFormContext<CreateFreeDateFormValues>()

	const { field: textField, fieldState: textFieldState } = useController({
		control,
		name: "tagText",
	})
	const {
		fields: tags,
		append,
		remove,
	} = useFieldArray({
		control,
		name: "tags",
	})

	return (
		<VStack gap={2} alignItems={"flex-start"}>
			<VStack gap={1} alignItems={"flex-start"}>
				<label
					className={css({ width: "fit-content", textStyle: "paragraph" })}
				>
					{label}
				</label>
				<div
					className={css({
						display: "flex",
						shadow: "sm",
						borderRadius: "8px",
					})}
				>
					<input
						{...textField}
						type="text"
						className={css({
							borderRadius: "8px 0px 0px 8px",
							padding: "8px",
							width: "100%",
							borderTop: "1px solid",
							borderLeft: "1px solid",
							borderBottom: "1px solid",
							borderTopColor: "gray",
							borderLeftColor: "gray",
							borderBottomColor: "gray",
						})}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const text = textField.value
								e.preventDefault()
								if (text.length === 0) return
								const lowercaseText = text.toLowerCase()
								if (tags.map((t) => t.text).includes(lowercaseText)) return
								append({ text: lowercaseText, id: lowercaseText })
								textField.onChange("")
							}
						}}
					/>
					<button
						type="button"
						className={css({
							backgroundColor: "secondary",
							width: "40px",
							borderRadius: "0px 8px 8px 0px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						})}
						onClick={() => {
							const text = textField.value
							if (text.length === 0) return
							const lowercaseText = text.toLowerCase()
							if (tags.map((t) => t.text).includes(lowercaseText)) return
							append({ text: lowercaseText, id: lowercaseText })
							textField.onChange("")
						}}
					>
						<FiPlus className={css({ color: "white" })} size={22} />
					</button>
				</div>
				{textFieldState.error && (
					<p className={css({ textStyle: "error" })}>
						{textFieldState.error.message}
					</p>
				)}
			</VStack>
			<div className={css({ display: "flex", gap: "8px", flexWrap: "wrap" })}>
				{tags.map((tag, i) => (
					<div
						className={css({
							color: "white",
							backgroundColor: "secondary",
							overflow: "visible",
							borderRadius: "20px",
							padding: "0px 16px",
							lineHeight: "38px",
							height: "40px",
							letterSpacing: "0.04em",
							fontStyle: "italic",
							fontWeight: "bold",
							textDecoration: "none",
						})}
						key={tag.id}
					>
						<HStack height={"100%"} gap={2} alignItems="center">
							<span>#{tag.text}</span>
							<button
								className={css({ cursor: "pointer" })}
								type="button"
								onClick={() => {
									remove(i)
								}}
							>
								<FiX className={css({ color: "white" })} size={20} />
							</button>
						</HStack>
					</div>
				))}
			</div>
		</VStack>
	)
}
