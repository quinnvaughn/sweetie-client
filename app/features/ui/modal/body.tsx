import { css } from "~/styled-system/css"

type Props = {
	children: React.ReactNode | React.ReactNode[]
	id?: string
}

export function ModalBody({ children, id }: Props) {
	return (
		<div
			id={id}
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
