import { DateTime } from "luxon"
import { match } from "ts-pattern"

export function getIsoToday() {
	return (DateTime.now().toISO() as string).split("T")[0]
}

export function getNumberSuffix(num: number) {
	const th = "th"
	const rd = "rd"
	const nd = "nd"
	const st = "st"

	if (num === 11 || num === 12 || num === 13) return th

	const lastDigit = num.toString().slice(-1)

	return match(lastDigit)
		.with("1", () => st)
		.with("2", () => nd)
		.with("3", () => rd)
		.otherwise(() => th)
}
