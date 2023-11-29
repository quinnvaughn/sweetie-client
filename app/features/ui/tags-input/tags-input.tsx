import { useEffect } from "react"
import { FiPlus, FiX } from "react-icons/fi/index.js"
import { useControlField, useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	textName: string
	tagsName: string
	label: string
}

export function TagsInput({ tagsName, textName, label }: Props) {
	const { getInputProps, error } = useField(textName)
	const { error: tagsError } = useField(tagsName)
	const [text, setText] = useControlField<string>(textName)
	const [tags, setTags] = useControlField<string[]>(tagsName)

	useEffect(() => {
		console.log("tags", tags)
	}, [tags])

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
						{...getInputProps({
							value: text,
							id: textName,
							onChange: (e) => setText(e.target.value),
						})}
						name={textName}
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
								e.preventDefault()
								if (text.length === 0) return
								const lowercaseText = text.toLowerCase()
								if (tags.includes(lowercaseText)) return
								setTags([...tags, lowercaseText])
								setText("")
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
							const lowercaseText = text.toLowerCase()
							if (tags.includes(lowercaseText)) return
							setTags([...tags, lowercaseText])
							setText("")
						}}
					>
						<FiPlus className={css({ color: "white" })} size={22} />
					</button>
				</div>
				<div className={css({ width: 0, overflow: "hidden", height: 0 })}>
					<input name={tagsName} />
				</div>
				{tags.map((tag) => (
					<input
						key={tag}
						type="hidden"
						name={tagsName}
						value={tag}
						onChange={() => {}}
					/>
				))}
				{error ? (
					<p className={css({ textStyle: "error" })}>{error}</p>
				) : tagsError ? (
					<p className={css({ textStyle: "error" })}>{tagsError}</p>
				) : null}
			</VStack>
			<div className={css({ display: "flex", gap: "8px", flexWrap: "wrap" })}>
				{tags.map((tag) => (
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
						key={tag}
					>
						<HStack height={"100%"} gap={2} alignItems="center">
							<span>#{tag}</span>
							<button
								className={css({ cursor: "pointer" })}
								type="button"
								onClick={() => {
									setTags(tags.filter((t) => t !== tag))
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
