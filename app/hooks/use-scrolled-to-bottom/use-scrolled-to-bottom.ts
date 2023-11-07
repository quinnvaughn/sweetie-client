import { useEffect, useRef } from "react"

export function useScrolledToBottom(cb: () => void, numTimes = 1) {
	const timesScrolled = useRef(0)
	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight

		if (bottom && timesScrolled.current < numTimes) {
			cb()
			timesScrolled.current += 1
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		})

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [handleScroll])
}
