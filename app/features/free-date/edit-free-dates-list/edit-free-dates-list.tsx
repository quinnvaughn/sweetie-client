import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { EditFreeDate } from "../edit-free-date"

type Props = {
	dates: FreeDateCardFragment[]
}

export function EditFreeDatesList({ dates }: Props) {
	return (
		<div
			className={css({
				display: "grid",
				gap: 2,
				gridTemplateColumns: {
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				},
			})}
		>
			{dates.map((date) => (
				<EditFreeDate key={date.id} date={date} />
			))}
		</div>
	)
}
