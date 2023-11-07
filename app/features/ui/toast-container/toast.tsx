import { useToast } from "~/hooks"
import { useEffect, useRef, useState } from "react"
import { BiSolidErrorAlt } from "react-icons/bi/index.js"
import { FiX } from "react-icons/fi/index.js"
import {
	IoIosCheckmarkCircle,
	IoIosInformationCircle,
	IoIosWarning,
} from "react-icons/io/index.js"
import { HStack } from "~/styled-system/jsx"
import { css, cva } from "~/styled-system/css"

const container = cva({
	base: {
		border: "1px solid",
		borderColor: "gray",
		borderRadius: "4px",
		padding: "16px",
		backgroundColor: "white",
		zIndex: 9999999,
		position: "relative",
	},
	variants: {
		dismissed: {
			true: {
				animation: "slideOut 0.4s ease-in-out forwards",
			},
			false: {
				animation: "slideIn 0.4s ease-in-out forwards",
			},
		},
	},
})

const progressBar = cva({
	base: {
		height: "100%",
		animation: "progressBar 4s linear forwards",
	},
	variants: {
		type: {
			success: {
				backgroundColor: "#4caf50",
			},
			error: {
				backgroundColor: "#f44336",
			},
			warning: {
				backgroundColor: "#ff9800",
			},
			info: {
				backgroundColor: "#2196f3",
			},
		},
	},
})

type Type = "success" | "error" | "warning" | "info"

type TypeInner = {
	color: string
	icon: JSX.Element
}

const types: Record<Type, TypeInner> = {
	success: {
		color: "#4caf50",
		icon: <IoIosCheckmarkCircle size={20} color="#4caf50" />,
	},
	error: {
		color: "#f44336",
		icon: <BiSolidErrorAlt size={20} color="#f44336" />,
	},
	warning: {
		color: "#ff9800",
		icon: <IoIosWarning size={20} color="#ff9800" />,
	},
	info: {
		color: "#2196f3",
		icon: <IoIosInformationCircle size={20} color="#2196f3" />,
	},
}

type Props = {
	id: number
	message: string
	type: Type
}

export function Toast({ id, message, type }: Props) {
	const { removeToast } = useToast()
	const timerId = useRef<number | null>(null)
	const progressId = useRef<HTMLDivElement | null>(null)
	const [dismissed, setDismissed] = useState(false)

	function handleMouseEnter() {
		if (timerId.current) {
			clearTimeout(timerId.current)
		}
		progressId.current?.style.setProperty("animation-play-state", "paused")
	}

	function handleMouseLeave() {
		const remainingTime =
			((progressId.current?.offsetWidth || 1) /
				(progressId.current?.parentElement?.offsetWidth || 1)) *
			4000
		progressId.current?.style.setProperty("animation-play-state", "running")
		timerId.current = window.setTimeout(() => {
			handleDismiss()
		}, remainingTime)
	}

	function handleDismiss() {
		setDismissed(true)
		setTimeout(() => {
			removeToast(id)
		}, 400)
	}

	useEffect(() => {
		timerId.current = window.setTimeout(() => {
			handleDismiss()
		}, 4000)

		return () => {
			if (timerId.current) {
				window.clearTimeout(timerId.current)
			}
		}
	}, [])

	return (
		<div
			className={container({ dismissed })}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<HStack gap={4} justifyContent="space-between" alignItems="center">
				{types[type].icon}
				<p className={css({ lineHeight: 1 })}>{message}</p>
				<button
					type="button"
					className={css({
						backgroundColor: "transparent",
						border: "none",
						outline: "none",
						cursor: "pointer",
					})}
					onClick={() => removeToast(id)}
				>
					<FiX size={20} className={css({ color: "grayText" })} />
				</button>
			</HStack>

			<div
				className={css({
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: "4px",
					backgroundColor: "rgba(0,0,0,0.1)",
				})}
			>
				<div className={progressBar({ type })} ref={progressId} />
			</div>
		</div>
	)
}
