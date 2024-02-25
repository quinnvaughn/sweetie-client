import { match } from "ts-pattern"

export function getNumberWithOrdinal(num: number) {
	const th = "th"
	const rd = "rd"
	const nd = "nd"
	const st = "st"

	if (num === 11 || num === 12 || num === 13) return th

	const lastDigit = num.toString().slice(-1)

	return match(lastDigit)
		.with("1", () => `${num}${st}`)
		.with("2", () => `${num}${nd}`)
		.with("3", () => `${num}${rd}`)
		.otherwise(() => `${num}${th}`)
}
