import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { $path } from "remix-routes"
import { PageContainer } from "~/features/ui"
import { ViewerIsLoggedInDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export const meta: MetaFunction = ({ matches }) => {
	const parentMeta = matches.flatMap((match) => match.meta ?? [])
	return [...parentMeta, { name: "robots", content: "noindex" }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	// check if the user is an admin
	// if not, redirect to the home page
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (data?.viewer?.role.name !== "admin") {
		return redirect($path("/"))
	}
	return {}
}

export default function AdminPathlessRoute() {
	return (
		<PageContainer
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 0px" }}
		>
			<Outlet />
		</PageContainer>
	)
}
