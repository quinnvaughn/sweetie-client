import { FaArrowDown, FaArrowUp } from "react-icons/fa/index.js"
import { FiPlus, FiX } from "react-icons/fi/index.js"
import { useControlField, useField } from "remix-validated-form"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	textName: string
	prepName: string
	label: string
}

export function BulletPointsInput({ prepName, textName, label }: Props) {
	const { getInputProps, error } = useField(textName)
	const { error: prepError } = useField(prepName)
	const [text, setText] = useControlField<string>(textName)
	const [prep, setPrep] = useControlField<string[]>(prepName)

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
								if (prep.includes(lowercaseText)) return
								setPrep([...prep, text])
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
							if (text.length === 0) return
							if (prep.includes(lowercaseText)) return
							setPrep([...prep, text])
							setText("")
						}}
					>
						<FiPlus className={css({ color: "white" })} size={22} />
					</button>
				</div>
				<div className={css({ width: 0, overflow: "hidden", height: 0 })}>
					<input name={prepName} />
				</div>
				{prep.map((p) => (
					<input key={p} type="hidden" name={prepName} value={p} />
				))}
				{error ? (
					<p className={css({ textStyle: "error" })}>{error}</p>
				) : prepError ? (
					<p className={css({ textStyle: "error" })}>{prepError}</p>
				) : null}
			</VStack>
			<ul className={css({ listStyle: "inside" })}>
				{prep.map((p, i) => (
					<HStack gap={2} alignItems={"center"} width={"100%"}>
						<li key={p}>{p}</li>
						{i !== 0 && prep.length > 1 && (
							<button
								className={css({ cursor: "pointer", height: "100%" })}
								type="button"
								onClick={() => {
									const newPrep = [...prep]
									const temp = newPrep[i - 1]
									newPrep[i - 1] = newPrep[i]
									newPrep[i] = temp
									setPrep(newPrep)
								}}
							>
								<FaArrowUp className={css({ color: "black" })} />
							</button>
						)}
						{i !== prep.length - 1 && (
							<button
								type="button"
								className={css({ cursor: "pointer", height: "100%" })}
								onClick={() => {
									const newPrep = [...prep]
									const temp = newPrep[i + 1]
									newPrep[i + 1] = newPrep[i]
									newPrep[i] = temp
									setPrep(newPrep)
								}}
							>
								<FaArrowDown className={css({ color: "black" })} />
							</button>
						)}
						<button
							className={css({ cursor: "pointer", height: "100%" })}
							type="button"
							onClick={() => {
								setPrep(prep.filter((x) => x !== p))
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
