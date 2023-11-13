import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { Link, Outlet, useFetcher } from "@remix-run/react"
import { $path } from "remix-routes"
import { PageContainer } from "~/features/ui"
import { GetViewerFreeDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerFreeDatesDocument, {
		retired: false,
	})

	if (!data?.viewer) {
		return redirect($path("/login"), { status: 404 })
	}

	return json({
		data,
		hasCreatedADate:
			data?.viewer?.tastemaker?.experiences &&
			data?.viewer.tastemaker.experiences.length > 0,
	})
}

export default function FreeDatesRoute() {
	const fetcher = useFetcher<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "16px", md: "16px 0px" }}
		>
			<Outlet />
			<VStack gap={8}>
				{fetcher.data?.hasCreatedADate && (
					<VStack
						gap={4}
						alignItems="center"
						padding={"16px"}
						borderRadius={"8px"}
						border={"1px solid"}
						borderColor={"gray"}
					>
						<p className={css({ textStyle: "paragraph" })}>
							Now that you've created some dates, make sure to share your
							profile to let everyone know about them!
						</p>
						<Link to={$path("/tastemaker/free-dates/created/share")}>
							Share
						</Link>
					</VStack>
				)}
				{/* <CreatedDatesTab /> */}
			</VStack>
		</PageContainer>
	)
}
