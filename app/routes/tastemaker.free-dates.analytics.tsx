import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { DateAnalyticsList } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import { GetViewerFreeDateAnalyticsDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerFreeDateAnalyticsDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}

	return json({ dates: data.viewer.tastemaker?.freeDates ?? [] })
}

export default function FreeDatesAnalyticsRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<VStack gap={4} alignItems="flex-start">
				<h1
					className={css({
						textStyle: "h1",
						fontSize: { base: "24px", md: "32px" },
					})}
				>
					Analytics
				</h1>
				{match(data.dates)
					.when(
						(d) => d.length === 0,
						() => (
							<p className={css({ textStyle: "paragraph" })}>
								No free dates yet.
							</p>
						),
					)
					.when(
						(d) => d.length > 0,
						(dates) => <DateAnalyticsList dates={dates} />,
					)
					.otherwise(() => null)}
			</VStack>
		</PageContainer>
	)
}
