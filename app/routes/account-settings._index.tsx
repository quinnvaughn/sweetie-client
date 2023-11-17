import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { AiOutlineIdcard } from "react-icons/ai/index.js"
import { MdSecurity } from "react-icons/md/index.js"
import { $path } from "remix-routes"
import { PageContainer } from "~/features/ui"
import { AccountSettingsLink } from "~/features/user"
import { ViewerIsLoggedInDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	// is user logged in?
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return null
}

export default function AccountSettingsRoute() {
	const { getViewerUsername } = useViewer()
	return (
		<PageContainer
			width={{ sm: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0" }}
		>
			<VStack gap={6} alignItems="flex-start">
				<VStack gap={2} alignItems="flex-start">
					<h1
						className={css({
							textStyle: "h1",
							fontSize: { base: "24px", md: "32px" },
						})}
					>
						Account settings
					</h1>
					<Link
						className={css({
							fontWeight: "bold",
							color: "black",
							textDecoration: "underline",
						})}
						to={$path("/user/:username", { username: getViewerUsername() })}
					>
						Go to profile
					</Link>
				</VStack>
				<div
					className={css({
						base: {
							display: "grid",
							width: "100%",
							gap: 2,
							gridTemplateColumns: "1fr",
						},
						md: {
							gridTemplateColumns: "repeat(2, 1fr)",
						},
						lg: {
							gridTemplateColumns: "repeat(3, 1fr)",
						},
					})}
				>
					<AccountSettingsLink
						to={$path("/account-settings/personal-info")}
						icon={
							<AiOutlineIdcard size={24} className={css({ color: "black" })} />
						}
						title="Personal Info"
						description="Edit your personal information"
					/>
					<AccountSettingsLink
						to={$path("/account-settings/login-and-security")}
						icon={<MdSecurity size={24} className={css({ color: "black" })} />}
						title="Login and Security"
						description="Update your password"
					/>
					{/* <AccountSettingsLink
						to={ROUTES.ACCOUNT_SETTINGS.PAYMENT.path}
						icon={<MdOutlinePayment size={24} color={theme.colors.secondary} />}
						title="Payments"
						description="Add or remove payment methods"
					/> */}
				</div>
			</VStack>
		</PageContainer>
	)
}
