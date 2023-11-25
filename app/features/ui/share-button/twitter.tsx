import { ShareButton } from "./share-button"
import { generateUTMLink, mixpanel } from "~/lib"
import { FaTwitter } from "react-icons/fa/index.js"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function TwitterShareButton({
	campaign,
	link,
	css: cssProp = {},
}: Props) {
	return (
		<ShareButton
			css={cssProp}
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
