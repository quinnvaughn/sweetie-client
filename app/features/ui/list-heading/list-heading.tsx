import { css } from "~/styled-system/css"

type Props = {
	title: string
	description?: string | null
}

export function ListHeading({ title, description }: Props) {
	return (
		<div
			className={css({
				width: "100%",
				paddingBottom: "8px",
				borderBottomColor: "gray",
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: 2,
			})}
		>
			<p
				className={css({
					textStyle: "paragraph",
					fontWeight: "800",
					fontSize: "30px",
				})}
			>
				{title}
			</p>
			{description && (
				<p
					className={css({
						textStyle: "paragraph",
						color: "grayText",
						fontWeight: "400",
						fontSize: "16px",
					})}
				>
					{description}
				</p>
			)}
		</div>
	)
}
