import { useEffect } from "react"
import { useTrack } from ".."

export function useOpenedModal(modal: string) {
	const track = useTrack()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		track("User Opened Modal", {
			modal,
		})
	}, [modal])

	return null
}
