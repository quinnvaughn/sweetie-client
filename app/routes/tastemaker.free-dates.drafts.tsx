import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { DraftList } from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import { DraftsDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, DraftsDocument)

	if (!data?.viewer) {
		return redirect($path("/login"), { status: 404 })
	}

	return json({
		viewer: data.viewer,
	})
}

export default function FreeDateDraftsRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<VStack gap={4} alignItems="flex-start" width={"100%"}>
				<h1
					className={css({
						fontSize: { base: "24px", md: "32px" },
						textStyle: "h1",
					})}
				>
					Drafts
				</h1>
				{match(data.viewer.drafts)
					.when(
						(drafts) => drafts.length === 0,
						() => (
							<HStack gap={4} flexWrap="wrap" justifyContent={"center"}>
								<p className={css({ textStyle: "paragraph" })}>
									You haven't created any drafts yet.
								</p>
							</HStack>
						),
					)
					.when(
						(drafts) => drafts.length > 0,
						(drafts) => <DraftList drafts={drafts} />,
					)
					.run()}
			</VStack>
		</PageContainer>
	)
}
