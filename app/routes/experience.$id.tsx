import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { match } from "ts-pattern"
import { client } from "~/graphql/client"
import { GetDateExperienceDocument } from "~/graphql/generated"
import { $params } from "remix-routes"

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = $params("/experience/:id", params)
	const { data } = await client.query({
		query: GetDateExperienceDocument,
		variables: { id },
	})

	if (!data?.dateExperience) {
		throw new Response("Not Found", { status: 404 })
	}

	return json(data)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.dateExperience) {
		return [{ title: "Not Found" }, { status: "404" }]
	}
	return match(data.dateExperience)
		.with(
			{ __typename: "DateExperience" },
			({
				title,
				description,
				thumbnail,
				tags,
				createdAt,
				updatedAt,
				tastemaker,
				stops,
			}) => [
				{ title: `${title} - Sweetie date idea` },
				{ name: "description", content: description.slice(0, 200) },
				{ name: "og:title", content: title },
				{ name: "og:description", content: description.slice(0, 200) },
				{ name: "og:image", content: thumbnail },
				{
					name: "og:url",
					content: `https://trysweetie.com/experience/${data.dateExperience.id}`,
				},
				{
					name: "og:site_name",
					content: "Sweetie",
				},
				{
					name: "og:type",
					content: "article",
				},
				{
					name: "article:published_time",
					content: createdAt,
				},
				{
					name: "article:modified_time",
					content: updatedAt,
				},
				{
					name: "article:author",
					content: `https://trysweetie.com/user/${tastemaker.user.id}`,
				},
				{
					name: "article:tag",
					content: [
						...tags.map((t) => t.name),
						"dating",
						"date ideas",
						...Array.from(
							new Set(
								stops.map((s) => s.location.address.city.name.toLowerCase()),
							),
						),
					],
				},
				{
					name: "article:section",
					content: "Dating",
				},
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:site",
					content: "@sweetie_dates",
				},
				// TODO: twitter:creator
				// we don't currently know the twitter handle of the tastemaker
			],
		)
		.otherwise(() => [{ title: "Not Found" }, { status: "404" }])
}

export default function ExperienceRoute() {
	return <div>Hello</div>
}
