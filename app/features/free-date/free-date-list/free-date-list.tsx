import { FreeDateCardFragment } from "~/graphql/generated"
import { FreeDateCard } from "../free-date-card"
import { match } from "ts-pattern"
import { css } from "~/styled-system/css"

type Props = {
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

export function FreeDateList({ freeDates, base, md, xl, noDatesText }: Props) {
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
					{freeDates.map((node) => (
						<FreeDateCard key={node.id} date={node} />
					))}
				</div>
			),
		)
		.otherwise(() => null)
}
