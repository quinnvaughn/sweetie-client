import { config } from "config.server"
import mixpanel from "mixpanel-browser"

const windowOrConfig = typeof window !== "undefined" ? "window" : "config"

const token =
	windowOrConfig === "window"
		? window.ENV.MIXPANEL_TOKEN
		: config.MIXPANEL_TOKEN

const proxy =
	windowOrConfig === "window"
		? window.ENV.MIXPANEL_PROXY
		: config.MIXPANEL_PROXY

const debug =
	windowOrConfig === "window"
		? window.ENV.ENVIRONMENT === "development"
		: config.ENVIRONMENT === "development"

mixpanel.init(token, {
	debug,
	ignore_dnt: true,
	api_host: proxy,
})

export function useMixpanel() {
	return mixpanel
}
