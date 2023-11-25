import { useEffect } from "react"
import { mixpanel } from "~/lib"

export function useOpenedModal(modal: string) {
	useEffect(() => {
		mixpanel.track("User Opened Modal", {
			modal,
		})
	}, [modal])

	return null
}
