import { BreakpointToken, token } from "~/styled-system/tokens"
import { formatPx } from "~/theme/utils"
import { useEffect, useState } from "react"

export function useMediaQuery(breakpoint: BreakpointToken) {
	const [matches, setMatches] = useState(false)

	const value = Number(token(`breakpoints.${breakpoint}`).replace("px", "")) - 1
	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${formatPx(value)})`)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		window.addEventListener("resize", listener)
		return () => window.removeEventListener("resize", listener)
	}, [matches, value])

	return matches
}
