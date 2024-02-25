// @ts-ignore - it thinks it should be the default import but it's not
import { QRCode } from "react-qr-code"
import { $path } from "remix-routes"
import { EventWaitlistGroupFragment } from "~/graphql/generated"
import { getEnv } from "~/lib"
import { getNumberWithOrdinal } from "~/lib/number"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	eventId: string
	waitlistGroup: EventWaitlistGroupFragment
}

export function EventWaitlistGroup({ waitlistGroup, eventId }: Props) {
	function onImageDownload() {
		const svg = document.getElementById("QRCode")
		if (!svg) return
		const svgData = new XMLSerializer().serializeToString(svg)
		const canvas = document.createElement("canvas")
		const ctx = canvas.getContext("2d")
		if (!ctx) return
		const img = new Image()
		img.onload = () => {
			canvas.width = img.width
			canvas.height = img.height
			ctx.drawImage(img, 0, 0)
			const pngFile = canvas.toDataURL("image/png")
			const downloadLink = document.createElement("a")
			downloadLink.download = "QRCode"
			downloadLink.href = `${pngFile}`
			downloadLink.click()
		}
		img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
	}

	return (
		<VStack
			gap={6}
			alignContent={"flex-start"}
			justifyContent={"flex-start"}
			className={css({
				border: "1px solid",
				borderColor: "gray",
				borderRadius: "8px",
				padding: "16px",
				width: "100%",
			})}
		>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h2
					className={css({
						fontSize: "20px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Your waitlist group code:
				</h2>
				<p
					className={css({
						fontSize: "18px",
						textAlign: "center",
						width: "100%",
					})}
				>
					{waitlistGroup.code}
				</p>
			</VStack>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h2
					className={css({
						fontSize: "20px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Your waitlist group spot:
				</h2>
				<p
					className={css({
						fontSize: "18px",
						textAlign: "center",
						width: "100%",
					})}
				>
					{getNumberWithOrdinal(waitlistGroup.position)}
				</p>
			</VStack>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h2
					className={css({
						fontSize: "20px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Click to download your QR code:
				</h2>
				<button
					type="button"
					onClick={onImageDownload}
					className={css({ cursor: "pointer", width: "100%" })}
				>
					<QRCode
						id="QRCode"
						value={`${getEnv().FRONTEND_URL}${$path(
							"/event/:id",
							{ id: eventId },
							{ code: waitlistGroup.code },
						)}`}
						style={{ width: "100%" }}
					/>
				</button>
			</VStack>
		</VStack>
	)
}
