import { match } from "ts-pattern"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { FreeDateCard } from "../free-date-card"

type Props = {
	numImagesLoaded?: number
	noDatesText?: string
	freeDates: FreeDateCardFragment[]
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
}: Props) {
	return match(freeDates)
		.when(
			(freeDates) => freeDates.length === 0,
			() => (
				<p className={css({ textStyle: "paragraph" })}>
					{noDatesText ?? "No dates found. Maybe try a different search?"}
				</p>
			),
		)
		.when(
			(freeDates) => freeDates.length > 0,
			(freeDates) => (
				<div
					className={css({
						base: base ?? {
							display: "grid",
							gap: 2,
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
