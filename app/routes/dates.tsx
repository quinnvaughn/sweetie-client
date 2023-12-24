import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json, redirect } from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { PlannedDateList } from "~/features/planned-date"
import { PageContainer } from "~/features/ui"
import {
	PlannedDateListDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data: viewerData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!viewerData?.viewer) {
		return redirect($path("/login"))
	}

	const { data } = await gqlFetch(request, PlannedDateListDocument)
	if (!data?.viewer?.plannedDates) return json({ plannedDates: [] })
	return json({ plannedDates: data?.viewer?.plannedDates })
}

export default function DatesRoute() {
	const { plannedDates } = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<VStack gap={4} width={"100%"} alignItems={"flex-start"}>
				<h1
					className={css({
						fontSize: { base: "24px", md: "32px" },
						textStyle: "h1",
					})}
				>
					My Planned Dates
				</h1>
				<PlannedDateList plannedDates={plannedDates} />
			</VStack>
		</PageContainer>
	)
}
