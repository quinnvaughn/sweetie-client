import { ShareButton } from "./share-button"
import { useToast } from "~/hooks"
import { generateUTMLink, mixpanel } from "~/lib"
import { FiCopy } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { SystemStyleObject } from "@pandacss/dev"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function CopyLinkShareButton({
	campaign,
	link,
	css: cssProp = {},
}: Props) {
	const { success } = useToast()
	return (
		<ShareButton
			css={cssProp}
			text="Copy Link"
			icon={<FiCopy size={32} className={css({ color: "black" })} />}
			onClick={() => {
				const generatedLink = generateUTMLink(link ?? window.location.href, {
					source: "copy-link",
					medium: "share-button",
					campaign,
				})
				navigator.clipboard.writeText(generatedLink)
				mixpanel.track("User Shared", {
					share_method: "copy-link",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				success("Link copied to clipboard")
			}}
		/>
	)
}
