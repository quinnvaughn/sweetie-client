import { Link } from "@remix-run/react"
import { FiX } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	title: string
	to: string
}

export function ModalHeader({ title, to }: Props) {
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
				{title}
			</h1>
			<Link
				className={css({
					cursor: "pointer",
					_hover: {
						opacity: 0.7,
					},
				})}
				to={to}
				aria-label="Close Modal"
			>
				<FiX
					aria-hidden="true"
					size={"24px"}
					className={css({ color: "black" })}
				/>
			</Link>
		</HStack>
	)
}
