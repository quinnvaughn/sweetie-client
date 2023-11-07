import { DateExperienceCardFragment } from "~/graphql/generated"
import { FreeDateCard } from "../free-date-card"
import { match } from "ts-pattern"
import { css } from "~/styled-system/css"

type Props = {
	dateExperiences: DateExperienceCardFragment[]
}

export function FreeDateList({ dateExperiences }: Props) {
	return match(dateExperiences)
		.when(
			(dateExperiences) => dateExperiences.length === 0,
			() => (
				<p className={css({ textStyle: "paragraph" })}>
					No dates found. Maybe try a different search?
				</p>
			),
		)
		.when(
			(dateExperiences) => dateExperiences.length > 0,
			(dateExperiences) => (
				<div
					className={css({
						base: {
							display: "grid",
						},
						sm: {
							gap: 2,
							gridTemplateColumns: "1fr",
						},
						md: {
							gridTemplateColumns: "repeat(2, 1fr)",
						},
						xl: {
							gridTemplateColumns: "repeat(3, 1fr)",
						},
					})}
				>
					{dateExperiences.map((node) => (
						<FreeDateCard key={node.id} dateExperience={node} />
					))}
				</div>
			),
		)
		.otherwise(() => null)
}
