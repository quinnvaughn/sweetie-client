import { DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { CategorizedDateLists, TrendingFreeDates } from "~/features/free-date"
import { SearchBar } from "~/features/search"
import { PageContainer } from "~/features/ui/page-container"
import {
	CategorizedDateListsDocument,
	GetFeaturedDatesDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data, response } = await gqlFetch(request, GetFeaturedDatesDocument)
	const { data: categorizedDateListsData } = await gqlFetch(
		request,
		CategorizedDateListsDocument,
	)
	return json(
		{ ...data, ...categorizedDateListsData },
		{
			headers: { "Set-Cookie": response?.headers.get("Set-Cookie") ?? "" },
		},
	)
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
				<TrendingFreeDates freeDates={data.featuredFreeDates ?? []} />
				<VStack gap={6}>
					<CategorizedDateLists
						categorizedDateLists={data.categorizedDateLists ?? []}
					/>
					<p>
						Want to find more dates? Trying{" "}
						<button
							className={css({
								textStyle: "paragraph",
								color: "primary",
								backgroundColor: "transparent",
								border: "none",
								cursor: "pointer",
								"&:hover": {
									textDecoration: "underline",
								},
							})}
							type="button"
							onClick={() => ref?.current?.focus()}
						>
							searching
						</button>
					</p>
				</VStack>
			</VStack>
		</PageContainer>
	)
}
