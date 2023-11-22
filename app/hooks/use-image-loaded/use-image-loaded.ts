import { useEffect, useState } from "react"

export function useImageLoaded(src: string) {
	const [loaded, setLoaded] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => setLoaded(true)
		img.onerror = () => setError(true)
	}, [src])

	return { loaded, error }
}
