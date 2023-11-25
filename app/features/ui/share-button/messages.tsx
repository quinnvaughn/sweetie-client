import { ShareButton } from "./share-button"
import { generateUTMLink, mixpanel } from "~/lib"
import { FiMessageSquare } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function MessagesShareButton({
	campaign,
	link,
	css: cssProp = {},
}: Props) {
	return (
		<ShareButton
			css={cssProp}
			text="Messages"
			icon={<FiMessageSquare size={32} className={css({ color: "black" })} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "sms",
					medium: "share-button",
					campaign,
				})
				mixpanel.track("User Shared", {
					share_method: "sms",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.location.href = `sms:?&body=${encodeURIComponent(body)}`
			}}
		/>
	)
}
