import { useEffect, useState } from "react"

type UseFieldTimeoutResult<T> = [
	T | null,
	React.Dispatch<React.SetStateAction<T | null>>,
]

export function useFieldTimeout<T>(
	defaultValue: T,
	// milliseconds
	timeout = 2000,
): UseFieldTimeoutResult<T> {
	const [field, setField] = useState<T | null>(defaultValue)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (field) {
			setTimeout(() => {
				setField(null)
			}, timeout)
		}
	}, [field])

	return [field, setField]
}
