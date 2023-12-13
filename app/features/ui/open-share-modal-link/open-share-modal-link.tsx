import { Link } from "@remix-run/react"
import { FiShare } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	to: string
}

export function OpenShareModalLink({ to }: Props) {
	return (
		<Link
			to={to}
			className={css({
				textDecoration: "underline",
				fontWeight: "bold",
				padding: "8px",
				borderRadius: "8px",
				_hover: {
					backgroundColor: "rgba(0,0,0,0.05)",
					cursor: "pointer",
				},
			})}
		>
			<HStack gap={2}>
				<FiShare size={20} className={css({ color: "black" })} />
				<span>Share</span>
			</HStack>
		</Link>
	)
}
