import { SystemStyleObject } from "@pandacss/dev"
import { FiMessageSquare } from "react-icons/fi/index.js"
import { useTrack } from "~/hooks"
import { generateUTMLink } from "~/lib"
import { css } from "~/styled-system/css"
import { ShareButton } from "./share-button"

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
	const track = useTrack()
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
				track("User Shared", {
					share_method: "sms",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.location.href = `sms:?&body=${encodeURIComponent(body)}`
			}}
		/>
	)
}
