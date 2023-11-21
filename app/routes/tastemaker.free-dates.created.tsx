import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { FreeDatesInformation } from "~/features/tastemaker"
import { PageContainer } from "~/features/ui"
import { GetViewerFreeDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerFreeDatesDocument, {
		retired: false,
	})

	if (!data?.viewer) {
		return redirect($path("/login"))
	}

	return json({
		viewer: data.viewer,
		hasCreatedADate:
			data?.viewer?.tastemaker?.experiences &&
			data?.viewer.tastemaker.experiences.length > 0,
	})
}

export default function FreeDatesRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<Outlet />
			<VStack gap={8} alignItems="flex-start" width={"100%"}>
				{data.hasCreatedADate && (
					<VStack
						width={"100%"}
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
						<Link
							className={button({ variant: "black", size: "lg" })}
							to={$path("/tastemaker/free-dates/created/share")}
						>
							Share
						</Link>
					</VStack>
				)}
				<FreeDatesInformation
					retired={false}
					dates={data.viewer.tastemaker?.experiences ?? []}
				/>
			</VStack>
		</PageContainer>
	)
}
