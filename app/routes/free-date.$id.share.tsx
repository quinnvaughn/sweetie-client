import { LoaderFunctionArgs } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import {
	CopyLinkShareButton,
	EmailShareButton,
	FacebookShareButton,
	MessagesShareButton,
	Modal,
	TwitterShareButton,
	WhatsAppShareButton,
} from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const campaign = "free date share modal"

export default function ShareFreeDateRoute() {
	const params = useParams()
	const { id } = $params("/free-date/:id/share", params)
	return (
		<Modal>
			<Modal.Header to={$path("/free-date/:id", { id })} title="Share" />
			<Modal.Body>
				<VStack gap={4} width={"100%"} alignItems="center">
					<p className={css({ textStyle: "paragraph" })}>
						Share this free date with your friends or followers!
					</p>
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
