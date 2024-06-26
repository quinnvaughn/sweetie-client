import { FaExternalLinkAlt } from "react-icons/fa/index.js"
import {
	FaCheck,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa6/index.js"
import { Desktop, Mobile } from "~/features/ui"
import { DateStopOptionFragment, TravelItemFragment } from "~/graphql/generated"
import { useToast } from "~/hooks"
import { css, cva } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { TravelTime } from ".."

type Props = {
	option: DateStopOptionFragment
	travel?: TravelItemFragment
	order: number
	optional: boolean
	formattedEstimatedTime: string
	id?: string
	nextOption: () => void
	previousOption: () => void
	isChecked: boolean
	setIsChecked: (checked: boolean) => void
	numSelected: number
}

const button = css({
	color: "black",
	cursor: "pointer",
	_disabled: {
		color: "gray",
		cursor: "not-allowed",
	},
})

export function DateStop({
	option,
	id,
	nextOption,
	previousOption,
	order,
	formattedEstimatedTime,
	isChecked,
	setIsChecked,
	optional,
	numSelected,
	travel,
}: Props) {
	const { error } = useToast()
	return (
		<VStack id={id} gap={option.travel ? 4 : 0} alignItems={"flex-start"}>
			<VStack gap={{ base: 4, md: 3 }} alignItems={"flex-start"}>
				<VStack
					gap={{ base: 4, md: 3 }}
					alignItems={"flex-start"}
					width={"100%"}
				>
					<Desktop css={{ width: "100%" }}>
						<HStack justifyContent={"space-between"} gap={2} width={"100%"}>
							<HStack gap={2} alignItems={"center"} flexWrap={"wrap"}>
								<h3
									className={css({
										fontSize: { base: "20px", md: "20px" },
										fontWeight: "bold",
									})}
								>
									{order}. {optional && "(Optional)"} {option.title}
								</h3>
								<span
									className={css({ color: "grayText", fontWeight: "normal" })}
								>
									{formattedEstimatedTime}
								</span>
							</HStack>
							<HStack gap={2}>
								<Checkbox
									label="Selected"
									isChecked={isChecked}
									setIsChecked={() => {
										if (numSelected === 1 && isChecked) {
											error("You must have at least one date option selected")
											return
										} else {
											setIsChecked(!isChecked)
										}
									}}
								/>
								{option.showOptions && (
									<HStack gap={2}>
										<button
											type="button"
											disabled={!option.hasPreviousOption}
											onClick={previousOption}
											className={button}
										>
											<FaChevronLeft />
										</button>
										<span>Option {option.optionOrder}</span>
										<button
											type="button"
											disabled={!option.hasNextOption}
											onClick={nextOption}
											className={button}
										>
											<FaChevronRight />
										</button>
									</HStack>
								)}
							</HStack>
						</HStack>
					</Desktop>
					<Mobile css={{ width: "100%" }}>
						<VStack
							gap={{ base: 4, md: 3 }}
							width={"100%"}
							alignItems="flex-start"
						>
							<HStack gap={2} alignItems={"center"} flexWrap={"wrap"}>
								<h3
									className={css({
										fontSize: { base: "20px", md: "20px" },
										fontWeight: "bold",
									})}
								>
									{order}. {optional && "(Optional)"} {option.title}
								</h3>
								<span
									className={css({ color: "grayText", fontWeight: "normal" })}
								>
									{formattedEstimatedTime}
								</span>
							</HStack>
							<HStack gap={2} width={"100%"} justifyContent={"space-between"}>
								<Checkbox
									label="Selected"
									isChecked={isChecked}
									setIsChecked={() => {
										if (numSelected === 1) {
											error("You must select at least one date option")
											return setIsChecked(true)
										} else {
											setIsChecked(!isChecked)
										}
									}}
								/>
								{option.showOptions && (
									<HStack gap={2}>
										<button
											type="button"
											disabled={!option.hasPreviousOption}
											onClick={previousOption}
											className={button}
										>
											<FaChevronLeft />
										</button>
										<span>Option {option.optionOrder}</span>
										<button
											type="button"
											disabled={!option.hasNextOption}
											onClick={nextOption}
											className={button}
										>
											<FaChevronRight />
										</button>
									</HStack>
								)}
							</HStack>
						</VStack>
					</Mobile>
					{option.location.website ? (
						<div
							className={css({ display: "flex", gap: 1, alignItems: "center" })}
						>
							<FaExternalLinkAlt className={css({ color: "black" })} />
							<a
								className={css({
									textStyle: "paragraph",

									fontWeight: "bold",
									textDecoration: "underline",
								})}
								href={option.location.website}
								target="_blank"
								rel="noreferrer noopener external nofollow"
							>
								{option.location.name}
							</a>
						</div>
					) : (
						<div
							className={css({ display: "flex", gap: 1, alignItems: "center" })}
						>
							<span className={css({ textStyle: "paragraph" })}>
								{option.location.name}
							</span>
						</div>
					)}
				</VStack>
				<p
					className={css({
						textStyle: "paragraph",
						whiteSpace: "pre-line",
						wordBreak: "break-word",
					})}
				>
					{option.content}
				</p>
			</VStack>
			{travel && <TravelTime travel={travel} />}
		</VStack>
	)
}

const checkboxButton = cva({
	base: {
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "24px",
		height: "24px",
		backgroundColor: "white",
		border: "1px solid var(--colors-gray)",
		borderRadius: "2px",
		marginRight: "4px",
	},
	variants: {
		checked: {
			true: {
				border: "1px solid var(--colors-secondary)",
			},
		},
	},
})

type CheckboxProps = {
	label?: string
	isChecked: boolean
	setIsChecked: (checked: boolean) => void
}

function Checkbox({ label, isChecked, setIsChecked }: CheckboxProps) {
	return (
		<div
			className={css({
				display: "flex",
				alignItems: "center",
				gap: 1,
			})}
			onClick={() => setIsChecked(!isChecked)}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					setIsChecked(!isChecked)
				}
			}}
		>
			<input
				type="checkbox"
				checked={isChecked}
				readOnly
				className={css({
					clip: "rect(0 0 0 0)",
					clipPath: "inset(50%)",
					height: "1px",
					overflow: "hidden",
					position: "absolute",
					whiteSpace: "nowrap",
					width: "1px",
				})}
			/>
			<button
				type="button"
				onClick={(e) => {
					setIsChecked(!isChecked)
					e.preventDefault()
					e.stopPropagation()
				}}
				className={checkboxButton({ checked: isChecked })}
				aria-hidden="true"
			>
				{isChecked && (
					<FaCheck
						className={css({
							color: "secondary",
							width: "16px",
							height: "16px",
						})}
					/>
				)}
			</button>
			{label && <label className={css({ cursor: "pointer" })}>{label}</label>}
		</div>
	)
}
