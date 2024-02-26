import { useEffect, useState } from "react"
// @ts-ignore
import {QRCode} from "react-qr-code"
import { $path } from "remix-routes"
import { Modal } from "~/features/ui"
import { GroupDateWaitlistGroupFragment } from "~/graphql/generated"
import { getEnv, getNumberWithOrdinal } from "~/lib"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { WaitlistGroupInfo } from "../waitlist-group-info"

const container = cva({
	base: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
		padding: "10px 18px",
		background: "white",
		borderTop: "1px solid",
		borderTopColor: "gray",
		display: "flex",
		gap: 2,
		flexDirection: "column",
		alignItems: "center",
		zIndex: 10,
		transition: "all 0.2s",
	},
	variants: {
		visible: {
			true: {
				opacity: 1,
			},
			false: {
				opacity: 0,
			},
		},
	},
})

type Props = {
	groupDateId: string
	waitlistGroup: GroupDateWaitlistGroupFragment
}

export function FloatingGroupDateWaitlistGroup(props: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [scrollY, setScrollY] = useState(0)
	const [showFloatingButton, setShowFloatingButton] = useState(true)
	// if the user stops scrolling for a while, show the floating button
	const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
		null,
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollTimeout) {
			clearTimeout(scrollTimeout)
		}
		setScrollTimeout(
			setTimeout(() => {
				setShowFloatingButton(true)
			}, 3000),
		)
	}, [scrollY])
	// check if user is scrolling down or up
	// if down, hide the floating button
	// if up, show the floating button
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const currentScrollY = window.scrollY
			// user is scrolling down
			// add a threshold to prevent the button from hiding when user is scrolling down a little bit
			if (currentScrollY > scrollY + 100) {
				setScrollY(currentScrollY)
				setShowFloatingButton(false)
				return
				// add a threshold to prevent the button from showing when user is scrolling up a little bit
			} else if (currentScrollY < scrollY - 100) {
				setScrollY(currentScrollY)
				setShowFloatingButton(true)
				return
			}
		})
		return () => window.removeEventListener("scroll", () => {})
	}, [scrollY])

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
		<div
			className={container({
				visible: showFloatingButton,
			})}
		>
			<button
				className={css({
					width: "100%",
					padding: "16px 8px",
					borderRadius: "8px",
					backgroundColor: "primary",
					color: "white",
					fontWeight: "bold",
					cursor: "pointer",
					_disabled: {
						opacity: 0.5,
						cursor: "not-allowed",
					},
					_hover: {
						filter: "brightness(110%)",
					},
				})}
				type="button"
				onClick={() => setIsModalOpen(true)}
			>
				Show waitlist group info
			</button>
			{isModalOpen && (
				<Modal>
					<Modal.Header
						type="button"
						title="Waitlist Group Info"
						onClick={() => setIsModalOpen(false)}
					/>
					<Modal.Body>
						<WaitlistGroupInfo  {...props} />
					</Modal.Body>
				</Modal>
			)}
		</div>
	)
}
