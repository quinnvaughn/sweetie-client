import { MdOutlineIosShare } from "react-icons/md/index.js"
import { $path } from "remix-routes"
import { GroupDateWaitlistGroupFragment } from "~/graphql/generated"
import { useToast } from "~/hooks"
import { getEnv, getNumberWithOrdinal } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	groupDateId: string
	waitlistGroup: GroupDateWaitlistGroupFragment
}

export function WaitlistGroupInfo({ waitlistGroup, groupDateId }: Props) {
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

	const { success } = useToast()

	return (
		<VStack
			gap={4}
			alignContent={"flex-start"}
			justifyContent={"flex-start"}
			width={"100%"}
		>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h3
					className={css({
						fontSize: "18px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Your waitlist group code:
				</h3>
				<p
					className={css({
						fontSize: "16px",
						textAlign: "center",
						width: "100%",
					})}
				>
					{waitlistGroup.code}
				</p>
			</VStack>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h3
					className={css({
						fontSize: "18px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Your waitlist group position:
				</h3>
				<p
					className={css({
						fontSize: "16px",
						textAlign: "center",
						width: "100%",
					})}
				>
					{getNumberWithOrdinal(waitlistGroup.position)}
				</p>
			</VStack>
			<VStack gap={2} alignItems={"center"} width={"100%"}>
				<h3
					className={css({
						fontSize: "18px",
						fontWeight: "bold",
						textAlign: "center",
					})}
				>
					Share your waitlist group link:
				</h3>
				<button
					type="button"
					onClick={() => {
						navigator.clipboard.writeText(
							`${getEnv().FRONTEND_URL}${$path(
								"/group-date/:id",
								{ id: groupDateId },
								{ code: waitlistGroup.code },
							)}`,
						)
						success("Link copied to clipboard")
					}}
					className={css({
						cursor: "pointer",
						padding: "8px",
						backgroundColor: "rgb(247, 247, 247)",
						display: "inline-flex",
						gap: 2,
						alignItems: "center",
						borderRadius: "8px",
					})}
				>
					<MdOutlineIosShare />
					<span>Copy link</span>
				</button>
			</VStack>
		</VStack>
	)
}
