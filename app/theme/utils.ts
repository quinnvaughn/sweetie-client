export function formatPx(text?: string | number, defaultValue?: string) {
	if (!text) return defaultValue || undefined
	return typeof text === "number"
		? `${text}px`
		: text?.includes("px") || text?.includes("%")
		? text
		: `${text}px`
}
