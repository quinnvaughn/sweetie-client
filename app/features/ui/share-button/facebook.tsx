import { ShareButton } from "./share-button"
import { generateUTMLink, mixpanel } from "~/lib"
import { FaSquareFacebook } from "react-icons/fa6/index.js"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function FacebookShareButton({
	campaign,
	link,
	css: cssProp = {},
}: Props) {
	return (
		<ShareButton
			css={cssProp}
			text="Facebook"
			icon={<FaSquareFacebook size={32} color={"#4267B2"} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "facebook",
					medium: "share-button",
					campaign,
				})
				mixpanel.track("User Shared", {
					share_method: "facebook",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.open(
					`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
						body,
					)}`,
					"_blank",
				)
			}}
		/>
	)
}
