import { DataFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { gqlFetch } from "~/graphql/graphql"
import { GetFeaturedDatesDocument } from "~/graphql/generated"
import { PageContainer } from "~/features/ui/page-container"
import { TrendingFreeDates } from "~/features/free-date"
import { VStack } from "~/styled-system/jsx"
import { css } from "~/styled-system/css"
import { SearchBar } from "~/features/search"

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
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0" }}
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
				<TrendingFreeDates freeDates={data.featuredFreeDates} />
			</VStack>
		</PageContainer>
	)
}
