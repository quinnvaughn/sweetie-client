import { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { PageContainer } from "~/features/ui/page-container"

export const meta: MetaFunction = ({ matches }) => {
	const parentMeta = matches.flatMap((match) => match.meta ?? [])
	return [...parentMeta, { name: "robots", content: "noindex" }]
}

export default function Auth() {
	return (
		<PageContainer
			width={{ base: "100%", md: "400px" }}
			padding={{ base: "20px", md: "40px 0" }}
		>
			<Outlet />
		</PageContainer>
	)
}
