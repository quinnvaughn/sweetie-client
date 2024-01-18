import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { FreeDatesInformation } from "~/features/tastemaker"
import { PageContainer } from "~/features/ui"
import { GetViewerFreeDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerFreeDatesDocument, {
		archived: true,
	})

	if (!data?.viewer) {
		return redirect($path("/login"), { status: 404 })
	}

	return json({
		viewer: data.viewer,
	})
}

export default function FreeDatesRetiredRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<VStack alignItems="flex-start" width={"100%"}>
				<FreeDatesInformation
					archived={true}
					dates={data.viewer.tastemaker?.freeDates ?? []}
				/>
			</VStack>
		</PageContainer>
	)
}
