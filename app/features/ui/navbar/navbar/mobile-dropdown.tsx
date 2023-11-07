import { cva } from "~/styled-system/css"
import { ComponentProps, useState } from "react"
import { NavbarLink } from "./navbar-link"
import { HStack, VStack } from "~/styled-system/jsx"
import { FiChevronDown, FiChevronUp } from "react-icons/fi/index.js"
import { useLocation } from "@remix-run/react"

const container = cva({
	base: {
		position: "relative",
		backgroundColor: "transparent",
		border: "none",
		cursor: "pointer",
		color: "secondary",
		fontWeight: 600,
		textAlign: "left",
	},
	variants: {
		active: {
			true: {
				color: "secondary",
			},
			false: {
				color: "black",
			},
		},
	},
})

const iconRecipe = cva({
	variants: {
		active: {
			true: {
				color: "secondary",
			},
			false: {
				color: "black",
			},
		},
	},
})

type Props = {
	links: ComponentProps<typeof NavbarLink>[]
	text: string
}

export function MobileDropdown({ text, links }: Props) {
	const [show, setShow] = useState(false)
	const { pathname } = useLocation()

	const active = links.filter((link) => pathname.includes(link.to)).length > 0

	return (
		<>
			<button
				type="button"
				className={container({ active })}
				onClick={() => setShow(!show)}
			>
				<HStack gap="1" alignItems="center">
					<span>{text}</span>
					{show ? (
						<FiChevronUp className={iconRecipe({ active })} size={20} />
					) : (
						<FiChevronDown className={iconRecipe({ active })} size={20} />
					)}
				</HStack>
			</button>
			{show && (
				<VStack gap="1" paddingLeft={4}>
					{links.map((link) => (
						<NavbarLink key={link.to} {...link} />
					))}
				</VStack>
			)}
		</>
	)
}
