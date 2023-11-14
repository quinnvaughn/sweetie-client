export function replaceSpaces(str: string) {
	return str.replace(/\s/g, "%20")
}

export function singularOrPlural(
	count: number,
	singular: string,
	plural: string,
): string {
	return count === 1 ? singular : plural
}

export function addACommaBetweenItems(index: number): string {
	return index ? ", " : ""
}
