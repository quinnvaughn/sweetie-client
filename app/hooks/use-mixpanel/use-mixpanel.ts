import mixpanel from "mixpanel-browser"
import { getEnv } from "~/lib"

const env = getEnv()

const token = env.MIXPANEL_TOKEN

const proxy = env.MIXPANEL_PROXY

const debug = env.NODE_ENV === "production" ? false : true

mixpanel.init(token, {
	debug,
	ignore_dnt: true,
	api_host: proxy,
})

export function useMixpanel() {
	return mixpanel
}
