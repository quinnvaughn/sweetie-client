import { replaceSpaces } from "."

type UTMProps = {
	source: string
	medium: string
	campaign: string
}

export function generateUTMLink(
	link: string,
	{ source, medium, campaign }: UTMProps,
) {
	source = replaceSpaces(source)
	medium = replaceSpaces(medium)
	campaign = replaceSpaces(campaign)
	const linkAlreadyIncludesQueryParam = link.includes("/?")
	if (linkAlreadyIncludesQueryParam) {
		return `${link}&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
	}
	return `${link}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
}
