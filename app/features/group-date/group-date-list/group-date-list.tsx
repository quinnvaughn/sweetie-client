import { GroupDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { GroupDateCard } from "../group-date-card"

type Props = {
	groupDates: GroupDateCardFragment[]
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

export function GroupDateList({ groupDates, base, md, xl }: Props) {
	return (
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
			{groupDates.map((g) => (
				<GroupDateCard key={g.id} groupDate={g} />
			))}
		</div>
	)
}
