import { useSearchParams } from "@remix-run/react"
import { css } from "~/styled-system/css"

function capitalizeFirstWord(str: string) {
	return str[0].toUpperCase() + str.slice(1)
}

function capitalize(str: string) {
	return str
		.split(" ")
		.map((word) => capitalizeFirstWord(word))
		.join(" ")
}

const spanStyles = css({
	fontSize: "36px",
	color: "secondary",
	fontWeight: "bold",
})

export function ExploreDateIdeas() {
	const [searchParams] = useSearchParams()
	const query = searchParams.get("query")
	const city = searchParams.get("city")
	return (
		<div className={css({ paddingBottom: 4 })}>
			<h1 className={css({ fontSize: "36px", fontWeight: "bold" })}>
				Explore
				{query ? <span className={spanStyles}>{` ${query} `}</span> : " "}
				date ideas {city ? "in " : ""}
				{city ? <span className={spanStyles}>{capitalize(city)}</span> : null}
			</h1>
		</div>
	)
}
