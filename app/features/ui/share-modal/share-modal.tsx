import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import {
	CopyLinkShareButton,
	EmailShareButton,
	FacebookShareButton,
	MessagesShareButton,
	Modal,
	TwitterShareButton,
	WhatsAppShareButton,
} from ".."

type Props = {
	to: string
	title?: string
	aboveText?: string
	campaign?: string
	shareUrl?: string
}

export function ShareModal({
	to,
	title = "Share",
	aboveText,
	campaign = "free date share modal",
	shareUrl,
}: Props) {
	return (
		<Modal>
			<Modal.Header type="link" to={to} title={title} />
			<Modal.Body>
				<VStack gap={4} width={"100%"} alignItems="center">
					{aboveText && (
						<p className={css({ textStyle: "paragraph", textAlign: "center" })}>
							{aboveText}
						</p>
					)}
					<div
						className={css({
							base: {
								display: "grid",
								gap: 2,
								width: "100%",
							},
							sm: {
								gridTemplateColumns: "repeat(1, 1fr)",
							},
							md: {
								gridTemplateColumns: "repeat(2, 1fr)",
							},
						})}
					>
						<CopyLinkShareButton link={shareUrl} campaign={campaign} />
						<FacebookShareButton link={shareUrl} campaign={campaign} />
						<TwitterShareButton link={shareUrl} campaign={campaign} />
						<EmailShareButton link={shareUrl} campaign={campaign} />
						<MessagesShareButton link={shareUrl} campaign={campaign} />
						<WhatsAppShareButton link={shareUrl} campaign={campaign} />
					</div>
				</VStack>
			</Modal.Body>
		</Modal>
	)
}
