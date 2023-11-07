import { button } from "~/recipes"
import { Link, useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { css } from "~/styled-system/css"

export default function AddToCalendarButton() {
	const params = useParams()
	const { id } = $params("/free-date/:id", params)
	return (
		<Link
			to={$path("/free-date/:id/add-to-calendar", { id })}
			className={css({
				padding: "12px",
				bg: "primary",
				width: { base: "200px", md: "100%" },
				textAlign: "center",
				color: "white",
				fontWeight: "bold",
				borderRadius: "8px",
			})}
		>
			Add to calendar
		</Link>
	)
}
