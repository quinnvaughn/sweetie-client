import { ShareButton } from "./share-button"
import { generateUTMLink } from "~/lib"
import { IoLogoWhatsapp } from "react-icons/io5/index.js"
import { useMixpanel } from "~/hooks"

type Props = {
	campaign: string
	link?: string
}

export function WhatsAppShareButton({ campaign, link }: Props) {
	const mixpanel = useMixpanel()
	return (
		<ShareButton
			text="WhatsApp"
			icon={<IoLogoWhatsapp size={32} fill={"#25d366"} />}
			onClick={() => {
				const body = generateUTMLink(link ?? window.location.href, {
					source: "whatsapp",
					medium: "share-button",
					campaign,
				})
				mixpanel.track("User Shared", {
					share_method: "whatsapp",
					share_medium: "share-button",
					share_campaign: campaign,
				})
				window.open(`https://wa.me/?text=${encodeURIComponent(body)}`, "_blank")
			}}
		/>
	)
}
