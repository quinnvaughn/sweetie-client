import { useEffect } from "react"
import { mixpanel } from "~/lib"

export function usePageView(page: string) {
	useEffect(() => {
		mixpanel.track_pageview({ page })
	}, [page])
}
