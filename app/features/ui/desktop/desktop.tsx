import { SystemStyleObject } from "@pandacss/dev"
import { css } from "~/styled-system/css"

type Props = {
	children: React.ReactNode | React.ReactNode[]
	css?: SystemStyleObject
}

export function Desktop({ children, css: cssProp = {} }: Props) {
	return (
		<div className={css({ display: { base: "none", md: "block" } }, cssProp)}>
			{children}
		</div>
	)
}
