import { Link, useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { freeDateStore } from "~/stores"
import { css } from "~/styled-system/css"

export function GoOnThisDateButton() {
	const params = useParams()
	const { id } = $params("/free-date/:id", params)
	return (
		<Link
			to={$path("/free-date/:id/add-to-calendar", { id })}
			className={css({
				padding: "12px",
				bg: "primary",
				width: { base: "100%" },
				textAlign: "center",
				color: "white",
				fontWeight: "bold",
				borderRadius: "8px",
				_hover: {
					filter: "brightness(110%)",
				},
			})}
		>
			Go on this date
		</Link>
	)
}
