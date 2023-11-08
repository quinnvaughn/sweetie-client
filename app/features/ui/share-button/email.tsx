import { ShareButton } from "./share-button"
import { generateUTMLink } from "~/lib"
import { FiMail } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { useMixpanel } from "~/hooks"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function EmailShareButton({ campaign, link, css: cssProp = {} }: Props) {
	const mixpanel = useMixpanel()
	return (
		<ShareButton
			css={cssProp}
			text="Email"
			icon={<FiMail size={32} className={css({ color: "black" })} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "email",
					medium: "share-button",
					campaign,
				})
				mixpanel.track("User Shared", {
					share_method: "email",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.open(`mailto:?&body=${encodeURIComponent(body)}`)
			}}
		/>
	)
}
