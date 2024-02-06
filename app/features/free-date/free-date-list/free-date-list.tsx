import { match } from "ts-pattern"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { GetHelpFindingADate } from ".."
import { FreeDateCard } from "../free-date-card"

type Props = {
	numImagesLoaded?: number
	noDatesText?: string
	freeDates: FreeDateCardFragment[]
	showContactUsLink?: boolean
	base?: {
		gap?: number
		gridTemplateColumns?: string
	}
	md?: {
		gap?: number
		gridTemplateColumns?: string
	}
	xl?: {
		gap?: number
		gridTemplateColumns?: string
	}
}

export function FreeDateList({
	freeDates,
	base,
	md,
	xl,
	noDatesText,
	numImagesLoaded = 3,
	showContactUsLink,
}: Props) {
	return match(freeDates)
		.when(
			(freeDates) => freeDates.length === 0,
			() => (
				<VStack
					gap={showContactUsLink ? 4 : 0}
					alignItems={"center"}
					width={"100%"}
				>
					<p className={css({ textStyle: "paragraph" })}>
						{noDatesText ?? "No dates found. Maybe try a different search?"}
					</p>
					{showContactUsLink && <GetHelpFindingADate />}
				</VStack>
			),
		)
		.when(
			(freeDates) => freeDates.length > 0,
			(freeDates) => (
				<div
					className={css({
						base: base ?? {
							display: "grid",
							columnGap: 6,
							rowGap: 10,
							gridTemplateColumns: "1fr",
						},
						md: md ?? {
							gridTemplateColumns: "repeat(2, 1fr)",
						},
						xl: xl ?? {
							gridTemplateColumns: "repeat(3, 1fr)",
						},
					})}
				>
					{freeDates.map((node, i) => (
						<FreeDateCard
							loading={i > numImagesLoaded - 1 ? "lazy" : "eager"}
							key={node.id}
							date={node}
						/>
					))}
				</div>
			),
		)
		.otherwise(() => null)
}
