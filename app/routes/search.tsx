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
import { match, P } from "ts-pattern"
import { z } from "zod"
import { FreeDateList } from "~/features/free-date"
import { ExploreDateIdeas, SearchBar } from "~/features/search"
import { PageContainer } from "~/features/ui"
import { DateExperiencesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { getEnv } from "~/lib"

const SearchParamsSchema = z.object({
	query: z.string().optional(),
	city: z.string().optional(),
	nsfw: z.enum(["on", "off"]).optional(),
	timesOfDay: z
		.array(z.enum(["morning", "afternoon", "evening", "late night"]))
		.optional(),
})

export type SearchParams = z.infer<typeof SearchParamsSchema>

export async function loader({ request }: DataFunctionArgs) {
	const urlParams = request.url.split("?")[1]
	const { city, nsfw, query, timesOfDay } = queryString.parse(
		urlParams,
	) as SearchParams
	const order = ["query", "city", "nsfw", "timesOfDay"]
	const parsedParams = {
		query:
			query === defaults.query
				? null
				: query
				? removeDateAndDateIdeas(query)
				: null,
		city: city === defaults.city ? null : city ? city : null,
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
				? timesOfDay.every((val, idx) => val === defaults.timesOfDay[idx])
					? null
					: timesOfDay
				: [timesOfDay]
			: null,
	}
	const cleaned = queryString.stringifyUrl(
		{
			url: $path("/search"),
			query: parsedParams,
		},
		{ skipNull: true, sort: (a, b) => order.indexOf(a) - order.indexOf(b) },
	)
	const env = getEnv()
	const cleanedURL = request.url
		// remove the protocol and domain
		.replace(env.FRONTEND_URL, "")
		// remove all the + and replace them with %20 aka space
		.replaceAll("+", "%20")
	if (cleaned !== cleanedURL) {
		return redirect(cleaned)
	}
	if (cleaned === $path("/search")) {
		return redirect($path("/"))
	}
	const { data } = await gqlFetch(request, DateExperiencesDocument, {
		nsfw: parsedParams.nsfw,
		query: parsedParams.query,
		city: parsedParams.city,
		timesOfDay: parsedParams.timesOfDay,
	})
	return json(data)
}

const defaults = {
	query: "",
	city: "",
	timesOfDay: ["morning", "afternoon", "evening"],
	nsfw: "off",
}

function removeDateAndDateIdeas(str: string) {
	return str.replace(/\bdate idea(s?)\b|\bdate(s?)\b|\bidea(s?)\b/gi, "")
}

function capitalizeFirstWord(str: string) {
	return str[0].toUpperCase() + str.slice(1)
}

function capitalize(str: string) {
	return str
		.split(" ")
		.map((word) => capitalizeFirstWord(word))
		.join(" ")
}

export const meta: MetaFunction = ({ location }: MetaArgs) => {
	const params = new URLSearchParams(location.search)
	const search = params.get("query")
	const city = params.get("city")
	const title = match(search)
		.with(P.nullish, () =>
			match(city)
				.with(
					P.nullish,
					() => "Date ideas - Get the best date ideas on Sweetie",
				)
				.otherwise(
					(city) =>
						`Date ideas in ${capitalize(
							city,
						)} - Get the best date ideas on Sweetie`,
				),
		)
		.otherwise((search) =>
			match(city)
				.with(
					P.nullish,
					() =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas - Get the best date ideas on Sweetie`,
				)
				.otherwise(
					(city) =>
						`${capitalizeFirstWord(
							removeDateAndDateIdeas(search),
						)} date ideas in ${capitalize(
							city,
						)} - Get the best date ideas on Sweetie`,
				),
		)
	return [
		{
			title,
		},
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
				freeDates={data.dateExperiences.edges.map(({ node }) => ({
					...node,
				}))}
			/>
		</PageContainer>
	)
}
