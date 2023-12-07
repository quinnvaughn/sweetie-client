import { Link } from "@remix-run/react"
import { FiX } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type LinkProps = {
	type: "link"
	to: string
}

type ButtonProps = {
	type: "button"
	onClick: () => void
}

type Props = {
	title: string
} & (LinkProps | ButtonProps)

export function ModalHeader(props: Props) {
	return (
		<HStack
			gap={1}
			justifyContent={"space-between"}
			alignItems="center"
			padding={"16px"}
			borderBottom={"1px solid"}
			borderBottomColor={"gray"}
		>
			<h1
				className={css({
					fontSize: 16,
					fontWeight: "bold",
					textOverflow: "ellipsis",
					overflow: "hidden",
					whiteSpace: "nowrap",
					flex: 1,
					textAlign: "center",
				})}
			>
				{props.title}
			</h1>
			{props.type === "link" && (
				<Link
					className={css({
						cursor: "pointer",
						_hover: {
							opacity: 0.7,
						},
					})}
					to={props.to}
					aria-label="Close Modal"
				>
					<FiX
						aria-hidden="true"
						size={"24px"}
						className={css({ color: "black" })}
					/>
				</Link>
			)}
			{props.type === "button" && (
				<button
					type="button"
					className={css({
						cursor: "pointer",
						_hover: {
							opacity: 0.7,
						},
					})}
					onClick={props.onClick}
					aria-label="Close Modal"
				>
					<FiX
						aria-hidden="true"
						size={"24px"}
						className={css({ color: "black" })}
					/>
				</button>
			)}
		</HStack>
	)
}
