import { Control, FieldValues, Path, useController } from "react-hook-form"
import { FaArrowDown, FaArrowUp } from "react-icons/fa/index.js"
import { FiPlus, FiX } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props<TFormValues extends FieldValues> = {
	control: Control<TFormValues>
	placeholder: string
	label: string
	error?: string
	textName: Path<TFormValues>
	onAdd: (text: string) => void
	onRemove: (index: number) => void
	onMove: (from: number, to: number) => void
	values: { id: string; text: string }[]
}

export function HookBulletPointsInput<TFormValues extends FieldValues>({
	control,
	label,
	placeholder,
	error,
	textName,
	onAdd,
	onMove,
	onRemove,
	values,
}: Props<TFormValues>) {
	const { field: textField, fieldState: textFieldState } = useController({
		name: textName,
		control,
	})
	return (
		<VStack gap={2} alignItems={"flex-start"} width={"100%"}>
			<VStack gap={1} alignItems={"flex-start"} width={"100%"}>
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
						width: "100%",
					})}
				>
					<input
						{...textField}
						placeholder={placeholder}
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
								const text = textField.value
								if (text.length === 0) return
								onAdd(text)
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
							onAdd(text)
						}}
					>
						<FiPlus className={css({ color: "white" })} size={22} />
					</button>
				</div>
				{error && <p className={css({ textStyle: "error" })}>{error}</p>}
			</VStack>
			<ul className={css({ listStyle: "inside" })}>
				{values.map((p, i) => (
					<HStack gap={2} alignItems={"center"} width={"100%"}>
						<li key={p.id}>{p.text}</li>
						{i !== 0 && values.length > 1 && (
							<button
								className={css({ cursor: "pointer", height: "100%" })}
								type="button"
								onClick={() => {
									onMove(i, i - 1)
								}}
							>
								<FaArrowUp className={css({ color: "black" })} />
							</button>
						)}
						{i !== values.length - 1 && (
							<button
								type="button"
								className={css({ cursor: "pointer", height: "100%" })}
								onClick={() => {
									onMove(i, i + 1)
								}}
							>
								<FaArrowDown className={css({ color: "black" })} />
							</button>
						)}
						<button
							className={css({ cursor: "pointer", height: "100%" })}
							type="button"
							onClick={() => {
								onRemove(i)
							}}
						>
							<FiX size={20} />
						</button>
					</HStack>
				))}
			</ul>
		</VStack>
	)
}
