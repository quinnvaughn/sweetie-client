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
import { css } from "~/styled-system/css"

type Props = {
	to: string
	title?: string
	aboveText?: string
	campaign?: string
}

export function ShareModal({
	to,
	title = "Share",
	aboveText,
	campaign = "free date share modal",
}: Props) {
	return (
		<Modal>
			<Modal.Header to={to} title={title} />
			<Modal.Body>
				<VStack gap={4} width={"100%"} alignItems="center">
					{aboveText && (
						<p className={css({ textStyle: "paragraph" })}>{aboveText}</p>
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
						<CopyLinkShareButton campaign={campaign} />
						<FacebookShareButton campaign={campaign} />
						<TwitterShareButton campaign={campaign} />
						<EmailShareButton campaign={campaign} />
						<MessagesShareButton campaign={campaign} />
						<WhatsAppShareButton campaign={campaign} />
					</div>
				</VStack>
			</Modal.Body>
		</Modal>
	)
}