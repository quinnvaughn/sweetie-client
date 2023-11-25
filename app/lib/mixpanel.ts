import { getEnv, replaceSpaces } from "."
import mixpanel from "mixpanel-browser"

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

const env = getEnv()

const token = env.MIXPANEL_TOKEN

const proxy = env.MIXPANEL_PROXY

const debug = env.NODE_ENV === "production" ? false : true

mixpanel.init(token, {
	debug,
	ignore_dnt: true,
	api_host: proxy,
})

export { mixpanel }
