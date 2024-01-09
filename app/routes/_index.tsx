import { DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { TrendingFreeDates } from "~/features/free-date"
import { SearchBar } from "~/features/search"
import { PageContainer } from "~/features/ui/page-container"
import { GetFeaturedDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data, response } = await gqlFetch(request, GetFeaturedDatesDocument)
	return json(data, {
		headers: { "Set-Cookie": response?.headers.get("Set-Cookie") ?? "" },
	})
}

export default function HomeRoute() {
	const data = useLoaderData<typeof loader>()
	const ref = useRef<HTMLInputElement>(null)
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0" }}
		>
			<VStack gap={8}>
				<p className={css({ textStyle: "paragraph", fontSize: "20px" })}>
					Your personal date concierge in{" "}
					<span className={css({ fontWeight: "bold", color: "secondary" })}>
						Los Angeles
					</span>
				</p>
				<SearchBar ref={ref} />
				<TrendingFreeDates freeDates={data.featuredFreeDates} ref={ref} />
			</VStack>
		</PageContainer>
	)
}
