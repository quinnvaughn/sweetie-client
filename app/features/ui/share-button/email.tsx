import { ShareButton } from "./share-button"
import { generateUTMLink } from "~/lib"
import { FiMail } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { useMixpanel } from "~/hooks"

type Props = {
	campaign: string
	link?: string
}

export function EmailShareButton({ campaign, link }: Props) {
	const mixpanel = useMixpanel()
	return (
		<ShareButton
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
