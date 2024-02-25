import { EventCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { EventCard } from "../event-card"

type Props = {
	events: EventCardFragment[]
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

export function EventList({ events, base, md, xl }: Props) {
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
			{events.map((e) => (
				<EventCard key={e.id} event={e} />
			))}
		</div>
	)
}
