import { ComponentProps, useState } from "react"
import { NavbarLink } from "./navbar-link"
import { useOutsideClick } from "~/hooks"
import { css, cva } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { FiChevronUp, FiChevronDown } from "react-icons/fi/index.js"
import { useLocation } from "@remix-run/react"

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

type Props = {
	links: ComponentProps<typeof NavbarLink>[]
	text: string
}

export function NavbarDropdown({ links, text }: Props) {
	const [open, setOpen] = useState(false)
	const { pathname } = useLocation()
	const ref = useOutsideClick<HTMLButtonElement>(() => setOpen(false))

	const active = links.filter((link) => pathname.includes(link.to)).length > 0

	return (
		<button
			type="button"
			className={container({ active })}
			ref={ref}
			onClick={() => setOpen(!open)}
		>
			<HStack gap="1" alignItems="center">
				<span>{text}</span>
				{open ? (
					<FiChevronUp className={iconRecipe({ active })} size={20} />
				) : (
					<FiChevronDown className={iconRecipe({ active })} size={20} />
				)}
			</HStack>
			{open && (
				<div
					className={css({
						position: "absolute",
						left: 0,
						transform: "translateY(4px)",
						minWidth: "100%",
						padding: 4,
						backgroundColor: "white",
						border: "1px solid gray",
						zIndex: 100,
						display: "flex",
						flexDirection: "column",
						borderRadius: 1,
					})}
				>
					{links.map((link) => (
						<NavbarLink key={link.to} {...link} />
					))}
				</div>
			)}
		</button>
	)
}
