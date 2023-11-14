import { DraftCard } from "../draft-card"
import { DraftCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"

type Props = {
	drafts: DraftCardFragment[]
	admin?: boolean
}

export function DraftList({ drafts, admin }: Props) {
	return (
		<div
			className={css({
				gap: 2,
				gridTemplateColumns: {
					base: "1fr",
					md: "repeat(2, minmax(250px, 1fr))",
					lg: "repeat(3, minmax(250px, 1fr))",
				},
			})}
		>
			{drafts.map((draft) => (
				<DraftCard key={draft.id} draft={draft} admin={admin} />
			))}
		</div>
	)
}
