import {
	DataFunctionArgs,
	MetaArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import queryString from "query-string"
import { $path } from "remix-routes"
import { P, match } from "ts-pattern"
import { z } from "zod"
import { FreeDateList } from "~/features/free-date"
import { ExploreDateIdeas, SearchBar } from "~/features/search"
import { PageContainer } from "~/features/ui"
import { FreeDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const SearchParamsSchema = z.object({
	query: z.string().optional(),
	cities: z.array(z.string()).optional(),
	nsfw: z.enum(["on", "off"]).optional(),
	timesOfDay: z
		.array(z.enum(["morning", "afternoon", "evening", "late night"]))
		.optional(),
})

export type SearchParams = z.infer<typeof SearchParamsSchema>

export async function loader({ request }: DataFunctionArgs) {
	const urlParams = request.url.split("?")[1]
	const { cities, nsfw, query, timesOfDay } = queryString.parse(
		urlParams,
	) as SearchParams
	const order = ["query", "cities", "nsfw", "timesOfDay"]
	const parsedParams = {
		query:
			query === defaults.query
				? null
				: query
				? removeDateAndDateIdeas(query)
				: null,
		cities: cities
			? // if time of day only has one value, then it will be a string, so we need to convert it to an array
			  Array.isArray(cities)
				? cities
				: [cities]
			: null,
		nsfw:
			nsfw === undefined
				? null
				: nsfw === defaults.nsfw
				? null
				: nsfw === "on"
				? "on"
				: null,
		timesOfDay: timesOfDay
			? // if time of day only has one value, then it will be a string, so we need to convert it to an array
			  Array.isArray(timesOfDay)
				? defaults.timesOfDay.every((val, idx) => val === timesOfDay[idx])
					? null
					: timesOfDay
				: [timesOfDay]
			: null,
	}
	// can only search if there is at least one city or a query
	if (!parsedParams.cities && !parsedParams.query) {
		return redirect($path("/"))
	}

	const cleaned = queryString.stringifyUrl(
		{
			url: $path("/search"),
			query: parsedParams,
		},
		{ skipNull: true, sort: (a, b) => order.indexOf(a) - order.indexOf(b) },
	)
	if (cleaned === $path("/search")) {
		return redirect($path("/"))
	}
	const { data } = await gqlFetch(request, FreeDatesDocument, {
		nsfw: parsedParams.nsfw,
		query: parsedParams.query,
		cities: parsedParams.cities,
		timesOfDay: parsedParams.timesOfDay,
	})

	return json(data)
}

const defaults = {
	query: "",
	cities: [],
	timesOfDay: ["morning", "afternoon", "evening"],
	nsfw: "off",
}

function removeDateAndDateIdeas(str: string) {
	return str.replace(/\bdate idea(s?)\b|\bdate(s?)\b|\bidea(s?)\b/gi, "")
}

function capitalizeFirstWord(str: string) {
	if (str.length === 0) return str
	return str[0].toUpperCase() + str.slice(1)
}

function capitalize(str: string) {
	return str
		.split(" ")
		.map((word) => capitalizeFirstWord(word))
		.join(" ")
}

function formatCities(cities: string[]) {
	return cities
		.map((city, i) =>
			i === cities.length - 1 && i !== 0
				? `or ${capitalize(city)}`
				: capitalize(city),
		)
		.join(", ")
}

export const meta: MetaFunction = ({ location }: MetaArgs) => {
	const params = new URLSearchParams(location.search)
	const search = params.get("query")
	const cities = params.getAll("cities")
	const title = match(search)
		.with(P.nullish, () =>
			match(cities)
				.with(
					P.nullish,
					() => "Date ideas - Get the best date ideas on Sweetie",
				)
				.when(
					(cities) => cities.length === 0,
					() => "Date ideas - Get the best date ideas on Sweetie",
				)
				.when(
					(cities) => cities.length === 1,
					(cities) =>
						`Date ideas in ${capitalize(
							cities[0],
						)} - Get the best date ideas on Sweetie`,
				)
				.otherwise(
					(cities) =>
						`Date ideas in ${formatCities(
							cities,
						)} - Get the best date ideas on Sweetie`,
				),
		)
		.otherwise((search) =>
			match(cities)
				.with(
					P.nullish,
					() =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas - Get the best date ideas on Sweetie`,
				)
				.when(
					(cities) => cities.length === 0,
					() =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas - Get the best date ideas on Sweetie`,
				)
				.when(
					(cities) => cities.length === 1,
					(cities) =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas in ${capitalize(
							cities[0],
						)} - Get the best date ideas on Sweetie`,
				)
				.otherwise(
					(cities) =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas in ${formatCities(
							cities,
						)} - Get the best date ideas on Sweetie`,
				),
		)
	const description = match(search)
		.with(P.nullish, () => "Find the best date ideas on Sweetie")
		.otherwise(
			(search) =>
				`${capitalizeFirstWord(
					removeDateAndDateIdeas(search),
				)} date ideas - Find the best date ideas on Sweetie`,
		)
	return [
		{ title },
		{ name: "description", content: description },
		{ name: "robots", content: "noindex" },
	]
}

export default function SearchRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0" }}
		>
			<ExploreDateIdeas />
			<SearchBar />
			<FreeDateList
				freeDates={data.freeDates.edges.map(({ node }) => ({
					...node,
				}))}
			/>
		</PageContainer>
	)
}
