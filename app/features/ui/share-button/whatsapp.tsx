import { SystemStyleObject } from "@pandacss/dev"
import { IoLogoWhatsapp } from "react-icons/io5/index.js"
import { useTrack } from "~/hooks"
import { generateUTMLink } from "~/lib"
import { ShareButton } from "./share-button"

type Props = {
	campaign: string
	link?: string
	css?: SystemStyleObject
}

export function WhatsAppShareButton({
	campaign,
	link,
	css: cssProp = {},
}: Props) {
	const track = useTrack()
	return (
		<ShareButton
			css={cssProp}
			text="WhatsApp"
			icon={<IoLogoWhatsapp size={32} fill={"#25d366"} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "whatsapp",
					medium: "share-button",
					campaign,
				})
				track("User Shared", {
					share_method: "whatsapp",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.open(`https://wa.me/?text=${encodeURIComponent(body)}`, "_blank")
			}}
		/>
	)
}
