import { css } from "~/styled-system/css"

type Props = {
	name: string
}

export function TimeOfTheDay({ name }: Props) {
	return (
		<span
			className={css({
				color: "primary",
				border: "1px solid",
				borderColor: "primary",
				padding: "8px",
				borderRadius: "8px",
				fontSize: "14px",
			})}
		>
			{name}
		</span>
	)
}
