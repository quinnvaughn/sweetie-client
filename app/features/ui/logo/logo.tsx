import { Link } from "@remix-run/react"
import { css } from "~/styled-system/css"
import { $path } from "remix-routes"

export function Logo() {
	return (
		<Link
			to={$path("/")}
			className={css({
				fontSize: "24px",
				fontWeight: 700,
				textDecoration: "none",
				color: "primary",
				_visited: {
					color: "primary",
				},
			})}
		>
			Sweetie
		</Link>
	)
}
