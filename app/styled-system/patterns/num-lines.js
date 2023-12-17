import { mapObject } from "../helpers.js"
import { css } from "../css/index.js"

const numLinesConfig = {
	transform(props) {
		const { lines, ...rest } = props
		return {
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": lines,
			...rest,
		}
	},
}

export const getNumLinesStyle = (styles = {}) =>
	numLinesConfig.transform(styles, { map: mapObject })

export const numLines = (styles) => css(getNumLinesStyle(styles))
numLines.raw = getNumLinesStyle
