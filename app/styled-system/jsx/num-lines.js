import { createElement, forwardRef } from "react"
import { styled } from "./factory.js"
import { getNumLinesStyle } from "../patterns/num-lines.js"

export const NumLines = /* @__PURE__ */ forwardRef(function NumLines(
	props,
	ref,
) {
	const { lines, ...restProps } = props
	const styleProps = getNumLinesStyle({ lines })
	return createElement(styled.div, { ref, ...styleProps, ...restProps })
})
