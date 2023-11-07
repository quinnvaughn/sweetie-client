import { css } from "~/styled-system/css"

type Props = {
	title: string
}

export function ListHeading({ title }: Props) {
	return (
		<div
			className={css({
				width: "100%",
				paddingBottom: "8px",
				borderBottomColor: "gray",
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
			})}
		>
			<p
				className={css({
					textStyle: "paragraph",
					fontWeight: "bold",
					fontSize: "24px",
				})}
			>
				{title}
			</p>
		</div>
	)
}
