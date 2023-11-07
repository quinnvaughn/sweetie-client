import { DataFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { gqlFetch } from "~/graphql/graphql"
import { GetFeaturedDatesDocument } from "~/graphql/generated"
import { PageContainer } from "~/features/ui/page-container"
import { TrendingFreeDates } from "~/features/free-date"
import { VStack } from "~/styled-system/jsx"
import { css } from "~/styled-system/css"
import { SearchBar } from "~/features/search"

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
		{
			name: "og:description",
			content:
				"Whether you're single or in a relationship, we have all the dates you want in Los Angeles, all for free.",
		},
		{
			name: "og:title",
			content: "Sweetie - Find the best dates to go on in Los Angeles",
		},
		{
			name: "og:type",
			content: "website",
		},
		{
			name: "og:url",
			content: "https://trysweetie.com",
		},
		{
			name: "og:image",
			content:
				"https://www.eharmony.com/wp-content/uploads/2020/08/los-angeles-singles-1024x576.jpg",
		},
		{
			name: "og:image:secure_url",
			content:
				"https://www.eharmony.com/wp-content/uploads/2020/08/los-angeles-singles-1024x576.jpg",
		},
	]
}

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, GetFeaturedDatesDocument)
	return json(data)
}

export type SearchParams = {
	city?: string
	text?: string
	timesOfDay?: string[]
	nsfw?: boolean
}

export default function HomeRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ sm: "100%", lg: 1024 }}
			padding={{ sm: "40px 20px", lg: "40px 0" }}
		>
			<VStack gap={8}>
				<VStack gap={4} alignItems="center">
					<h1
						className={css({
							textStyle: "h1",
							color: "primary",
						})}
					>
						Sweetie
					</h1>
					<p className={css({ textStyle: "paragraph", fontSize: "20px" })}>
						Find the best dates to go on in LA
					</p>
				</VStack>
				<SearchBar />
				<TrendingFreeDates dateExperiences={data.featuredDateExperiences} />
			</VStack>
		</PageContainer>
	)
}
