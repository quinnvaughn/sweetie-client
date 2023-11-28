import mix_panel from "mixpanel"
import { UAParser } from "ua-parser-js"

const mixpanel = mix_panel.init(process.env.MIXPANEL_TOKEN)

export const Mixpanel = {
	track: (
		request: Request,
		event: string,
		properties: mix_panel.PropertyDict,
		callback?: mix_panel.Callback,
	) => {
		const newProperties = { ...properties }
		const parsed = UAParser(request.headers.get("user-agent") || "")
		newProperties.$browser = parsed.browser.name
		newProperties.$device = parsed.device.type
		newProperties.$os = parsed.os.name
		newProperties.$referrer =
			request.headers.get("referrer") || request.headers.get("referer") || ""
		newProperties.$referring_domain =
			new URL(newProperties.$referrer).hostname || ""
		newProperties.$ip = request.headers.get("X-Forwarded-For") || ""
		// get the UTM params
		const utmParams = new URLSearchParams(request.url.split("?")[1] || "")
		newProperties.$utm_source = utmParams.get("utm_source") || ""
		newProperties.$utm_medium = utmParams.get("utm_medium") || ""
		newProperties.$utm_campaign = utmParams.get("utm_campaign") || ""
		newProperties.$utm_term = utmParams.get("utm_term") || ""
		newProperties.$utm_content = utmParams.get("utm_content") || ""
		return mixpanel.track(event, newProperties, callback)
	},
}
