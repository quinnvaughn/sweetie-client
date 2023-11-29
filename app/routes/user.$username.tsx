import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $params } from "remix-routes"
import { P, match } from "ts-pattern"
import { Desktop, Mobile, PageContainer } from "~/features/ui"
import { UserProfileDesktop, UserProfileMobile } from "~/features/user"
import { GetProfileDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { username } = $params("/user/:username", params)
	const { data } = await gqlFetch(request, GetProfileDocument, { username })

	return match(data?.user)
		.with(P.nullish, { __typename: "Error" }, () => {
			throw new Response("Not Found", { status: 404 })
		})
		.with({ __typename: "User" }, (user) => {
			return json({ user })
		})
		.otherwise(() => {
			throw new Response("Not Found", { status: 404 })
		})
}

export default function UserProfileRoute() {
	const { user } = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", md: 900, lg: 1200 }}
			padding={{ base: "16px", md: "32px 32px 64px" }}
		>
			<Desktop>
				<UserProfileDesktop user={user} />
			</Desktop>
			<Mobile>
				<UserProfileMobile user={user} />
			</Mobile>
		</PageContainer>
	)
}
