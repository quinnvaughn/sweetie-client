import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { FreeDateList } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import { GetViewerFavoritesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerFavoritesDocument)
	if (!data?.viewer) {
		throw new Error("User not found.")
	}
	return json({
		favorited: data.viewer.favoritedDates,
	})
}

export default function FavoritesRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<VStack gap={8} alignItems="flex-start">
				<h1
					className={css({
						fontSize: { base: "24px", md: "32px" },
						textStyle: "h1",
					})}
				>
					Favorited dates
				</h1>
				<FreeDateList
					freeDates={data.favorited}
					noDatesText="You haven't favorited any dates yet."
				/>
			</VStack>
		</PageContainer>
	)
}
