import { ShareButton } from "./share-button"
import { generateUTMLink } from "~/lib"
import { FaTwitter } from "react-icons/fa/index.js"
import { useMixpanel } from "~/hooks"

type Props = {
	campaign: string
	link?: string
}

export function TwitterShareButton({ campaign, link }: Props) {
	const mixpanel = useMixpanel()
	return (
		<ShareButton
			text="Twitter"
			icon={<FaTwitter size={32} color={"#1DA1F2"} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "twitter",
					medium: "share-button",
					campaign,
				})
				mixpanel.track("User Shared", {
					share_method: "twitter",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.open(
					`https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`,
					"_blank",
				)
			}}
		/>
	)
}
