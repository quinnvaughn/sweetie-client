import { css } from "~/styled-system/css"

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export function ModalBody({ children }: Props) {
	return (
		<div
			className={css({
				padding: "16px",
				overflowY: "scroll",
				width: "100%",
				height: "100%",
				flex: 1,
			})}
		>
			{children}
		</div>
	)
}
