import { useMixpanel } from "../use-mixpanel"
import { useEffect } from "react"

export function useOpenedModal(modal: string) {
	const mixpanel = useMixpanel()
	useEffect(() => {
		mixpanel.track("User Opened Modal", {
			modal,
		})
	}, [modal, mixpanel])

	return null
}
