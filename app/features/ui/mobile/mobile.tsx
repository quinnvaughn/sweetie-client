import { css } from "~/styled-system/css"

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export function Mobile({ children }: Props) {
	return (
		<div className={css({ display: { base: "block", md: "none" } })}>
			{children}
		</div>
	)
}
