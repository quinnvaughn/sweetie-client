import { Outlet } from "@remix-run/react"
import { PageContainer } from "~/features/ui/page-container"

export default function Auth() {
	return (
		<PageContainer
			width={{ sm: "100%", md: 400 }}
			padding={{ sm: 20, md: "40px 0" }}
		>
			<Outlet />
		</PageContainer>
	)
}
