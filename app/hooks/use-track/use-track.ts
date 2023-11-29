import { useFetcher } from "@remix-run/react"
import { $path } from "remix-routes"
import { action } from "~/routes/api.track"

export function useTrack() {
	const fetcher = useFetcher<typeof action>()

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (event: string, properties: Record<string, any>) => {
		const formData = new FormData()
		formData.append("event", event)
		formData.append("properties", JSON.stringify(properties))
		fetcher.submit(formData, { method: "post", action: $path("/api/track") })
	}
}
