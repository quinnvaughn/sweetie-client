import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	text: string
	icon: JSX.Element
	onClick: () => void
}

export function ShareButton({ text, icon, onClick }: Props) {
	return (
		<button
			className={css({
				border: "1px solid",
				borderColor: "gray",
				borderRadius: "8px",
				height: "76px",
				outline: "none",
				backgroundColor: "white",
				padding: "0 24px",
				_hover: {
					backgroundColor: "rgb(247, 247, 247)",
					cursor: "pointer",
				},
			})}
			type="button"
			onClick={(e) => {
				e.stopPropagation()
				e.preventDefault()
				onClick()
			}}
		>
			<HStack gap={4} justifyContent="flex-start">
				{icon}
				<p
					className={css({
						textStyle: "paragraph",
						fontWeight: "600",
						wordBreak: "break-all",
					})}
				>
					{text}
				</p>
			</HStack>
		</button>
	)
}
