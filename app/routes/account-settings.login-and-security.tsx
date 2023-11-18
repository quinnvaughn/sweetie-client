import { Link, Outlet } from "@remix-run/react"
import { $path } from "remix-routes"
import { Breadcrumbs, PageContainer } from "~/features/ui"
import { PersonalInfoField } from "~/features/user"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export default function LoginAndSecurityRoute() {
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<Outlet />
			<VStack gap={8} alignItems="flex-start">
				<VStack gap={4} alignItems="flex-start">
					<Breadcrumbs>
						<Breadcrumbs.Link to={$path("/account-settings")} text="Account" />
						<Breadcrumbs.CurrentPage text="Login & Security" />
					</Breadcrumbs>
					<h1
						className={css({
							textStyle: "h1",
							fontSize: { base: "24px", md: "32px" },
						})}
					>
						Login and Security
					</h1>
				</VStack>
				<div
					className={css({
						width: { base: "100%", md: "500px" },
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
					})}
				>
					<VStack gap={2} alignItems={"flex-start"} width={"100%"}>
						<div
							className={css({
								display: "flex",
								justifyContent: "flex-end",
								width: "100%",
							})}
						>
							<Link
								className={css({
									borderRadius: "9999px",
									padding: "8px 16px",
									bg: "secondary",
									color: "white",
									fontWeight: "bold",
								})}
								to={$path("/account-settings/login-and-security/edit")}
							>
								Edit Password
							</Link>
						</div>
						<PersonalInfoField label="Password" value={"********"} />
					</VStack>
				</div>
			</VStack>
		</PageContainer>
	)
}
