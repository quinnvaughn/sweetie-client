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

function formatCities(cities: string[]) {
	return cities
		.map((city, i) =>
			i === cities.length - 1 && i !== 0
				? `or ${capitalize(city)}`
				: capitalize(city),
		)
		.join(", ")
}

export function ExploreDateIdeas() {
	const [searchParams] = useSearchParams()
	const query = searchParams.get("query")
	const cities = searchParams.getAll("cities")
	return (
		<div className={css({ paddingBottom: 4 })}>
			<h1 className={css({ fontSize: "36px", fontWeight: "bold" })}>
				Explore
				{query ? <span className={spanStyles}>{` ${query} `}</span> : " "}
				date ideas {cities ? "in " : ""}
				{cities
					? formatCities(cities)
							// this is a hack to make sure the "or" is not highlighted
							.split(/(or )/)
							.map((value, i) =>
								i === 1 ? (
									value
								) : (
									<span key={value} className={spanStyles}>
										{value}
									</span>
								),
							)
					: null}
			</h1>
		</div>
	)
}
