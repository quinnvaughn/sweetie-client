import { MetaFunction, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { client } from "~/graphql/client"
import { GetFeaturedDatesDocument } from "~/graphql/generated"
import { $path } from "remix-routes"

export const meta: MetaFunction = () => {
	return [
		{ title: "Sweetie - Find the best date ideas in Los Angeles" },
		{
			name: "description",
			content:
				"Whether you're single or in a relationship, we have all the dates you want in Los Angeles, all for free.",
		},
		{
			name: "keywords",
			content:
				"dating, los angeles, dates, fun, love, romance, couples, single",
		},
		{ name: "author", content: "Sweetie" },
	]
}

export async function loader() {
	const { data } = await client.query({ query: GetFeaturedDatesDocument })

	return json(data)
}

export default function HomeRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			Home
			{data.featuredDateExperiences.map((experience) => {
				return (
					<Link
						to={$path("/experience/:id", { id: experience.id })}
						key={experience.id}
					>
						{experience.title}
					</Link>
				)
			})}
		</div>
	)
}
