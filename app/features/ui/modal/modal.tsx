import { useEffect } from "react"
import { css } from "~/styled-system/css"
import { ModalBody } from "./body"
import { ModalFooter } from "./footer"
import { ModalHeader } from "./header"

type Props = {
	children?: React.ReactNode
}

export function Modal({ children }: Props) {
	useEffect(() => {
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = "auto"
		}
	}, [])

	return (
		<div
			className={css({
				zIndex: 1000,
				width: "100%",
				height: "100%",
				overflow: "auto",
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			})}
		>
			<div
				className={css({
					bottom: { base: "0", md: "auto" },
					animation: "slideUp 0.3s ease-in-out",
					display: "flex",
					flexDirection: "column",
					background: "white",
					width: { base: "100%", md: "50%", lg: "40%" },
					height: { base: "90%", md: "70%" },
					borderRadius: "8px",
					maxWidth: "500px",
					position: "absolute",
				})}
			>
				{children}
			</div>
		</div>
	)
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
