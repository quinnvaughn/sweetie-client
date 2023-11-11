import { useMixpanel } from "../use-mixpanel"
import { useEffect } from "react"

export function usePageView(page: string) {
	const mixpanel = useMixpanel()

	useEffect(() => {
		mixpanel.track_pageview({ page })
	}, [mixpanel, page])
}
