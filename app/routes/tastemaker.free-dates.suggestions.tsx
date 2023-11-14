import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { DateSuggestionList } from "~/features/tastemaker"
import { PageContainer } from "~/features/ui"
import {
	DateSuggestionsDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data: authData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!authData?.viewer) {
		return redirect($path("/login"))
	}

	const { data } = await gqlFetch(request, DateSuggestionsDocument)

	return json({ dateSuggestions: data?.dateSuggestions ?? [] })
}

export default function SuggestionsRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
				<h1
					className={css({
						textStyle: "h1",
						fontSize: { base: "24px", md: "32px" },
					})}
				>
					Suggestions
				</h1>
				<p className={css({ textStyle: "paragraph" })}>
					These are some dates we'd like to see be created. Don't take them as
					gospel though, they're purely suggestions.
				</p>
				<DateSuggestionList suggestions={data.dateSuggestions} />
			</VStack>
		</PageContainer>
	)
}
