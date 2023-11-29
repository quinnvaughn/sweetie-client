import { Link, useLocation } from "@remix-run/react"
import { cva } from "~/styled-system/css"

const link = cva({
	base: {
		width: "100%",
		textAlign: "left",
		whiteSpace: "nowrap",
		textDecoration: "none",
		fontWeight: 600,
		_hover: {
			color: "secondary",
		},
	},
	variants: {
		active: {
			true: {
				color: "secondary",
			},
			false: {
				color: "black",
				_hover: {
					filter: "brightness(150%)",
				},
			},
		},
	},
})

type Props = {
	to: string
	text: string
}

export function NavbarLink({ to, text }: Props) {
	const { pathname } = useLocation()
	return (
		<Link
			prefetch="intent"
			className={link({ active: pathname.includes(to) })}
			to={to}
		>
			{text}
		</Link>
	)
}
