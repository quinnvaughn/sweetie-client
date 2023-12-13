import { useCallback, useState } from "react"
import { type SerializeFrom } from "@remix-run/server-runtime"
import { type FetcherWithComponents, useFetcher } from "@remix-run/react"

type CustomFetcher<T> = FetcherWithComponents<SerializeFrom<T>> & {
	reset: () => void
}

export function useCustomFetcher<T>() {
	const [, updateState] = useState({})
	const forceUpdate = useCallback(() => updateState({}), [])

	const fetcher = useFetcher() as CustomFetcher<T>

	fetcher.reset = useCallback(() => {
		if (fetcher.data) {
			for (const key in fetcher.data) {
				delete fetcher.data[key]
			}

			fetcher.data = undefined
		}

		forceUpdate()
	}, [fetcher, forceUpdate])

	return fetcher
}
