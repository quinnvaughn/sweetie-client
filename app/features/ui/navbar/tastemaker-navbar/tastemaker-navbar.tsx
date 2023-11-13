import { useState } from "react"
import { Navbar } from ".."
import { HStack } from "~/styled-system/jsx"
// import { useViewer } from "~/hooks";
import { $path } from "remix-routes"
import { Link, useLocation } from "@remix-run/react"
import { Desktop, Mobile } from "../.."
import { css } from "~/styled-system/css"

const linkAsButton = css({
	backgroundColor: "primary",
	textDecoration: "none",
	color: "white",
	padding: "8px 16px",
	fontWeight: "600",
	textAlign: "center",
	display: "block",
	borderRadius: "8px",
	width: { base: "100%", md: "auto" },
})

export function TastemakerNavbar() {
	const [isOpen, setIsOpen] = useState(false)
	// const { isLoggedIn, getViewerUsername } = useViewer()
	const { pathname } = useLocation()
	const isOnFreeDates = pathname.includes("/tastemaker/free-dates")
	return (
		<Navbar>
			<Mobile css={{ width: "100%" }}>
				<HStack
					flex={1}
					gap={1}
					justifyContent="space-between"
					alignItems="center"
				>
					<Navbar.Logo />
					<Navbar.Hamburger setIsOpen={setIsOpen}>
						{isOpen && (
							<Navbar.HamburgerDropdown>
								{isOnFreeDates && (
									<Link
										className={linkAsButton}
										to={$path("/free-date/create")}
									>
										Create new date
									</Link>
								)}
								<Navbar.MobileDropdown
									text="Free dates"
									links={[
										{
											to: $path("/tastemaker/free-dates/created"),
											text: "Created",
										},
										{
											to: $path("/tastemaker/free-dates/drafts"),
											text: "Drafts",
										},
										{
											to: $path("/tastemaker/free-dates/retired"),
											text: "Retired",
										},
										{
											to: $path("/tastemaker/free-dates/analytics"),
											text: "Analytics",
										},
										{
											to: $path("/tastemaker/free-dates/suggestions"),
											text: "Suggestions",
										},
									]}
								/>
								{/* <Navbar.MobileDropdown
								text="Custom dates"
								links={[
									{
										text: "Requests",
										to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.REQUESTS.path,
									},
									{
										text: "Messages",
										to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.MESSAGES.path,
									},
									{
										text: "Profile",
										to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.PROFILE.path,
									},
								]}
							/> */}
								{/* TODO: */}
								{/* {isLoggedIn("admin") && (
								<Navbar.Link
									to={ROUTES.ADMIN.DASHBOARD.DATE_EXPERIENCES.path}
									text="Admin"
								/>
							)} */}
								<Navbar.Link to={$path("/account-settings")} text="Account" />
								<Navbar.ButtonAsLink
									action={$path("/api/logout")}
									text="Log out"
								/>
							</Navbar.HamburgerDropdown>
						)}
					</Navbar.Hamburger>
				</HStack>
			</Mobile>
			<Desktop css={{ width: "100%" }}>
				<HStack
					flex={1}
					gap={1}
					justifyContent="space-between"
					alignItems="flex-start"
					width={"100%"}
				>
					<HStack gap={6} alignItems="center">
						<Navbar.Logo />
						<Navbar.Dropdown
							text="Free dates"
							links={[
								{
									to: $path("/tastemaker/free-dates/created"),
									text: "Created",
								},
								{
									to: $path("/tastemaker/free-dates/drafts"),
									text: "Drafts",
								},
								{
									to: $path("/tastemaker/free-dates/retired"),
									text: "Retired",
								},
								{
									to: $path("/tastemaker/free-dates/analytics"),
									text: "Analytics",
								},
								{
									to: $path("/tastemaker/free-dates/suggestions"),
									text: "Suggestions",
								},
							]}
						/>
						{/* <Navbar.Dropdown
						text="Custom dates"
						links={[
							{
								text: "Requests",
								to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.REQUESTS.path,
							},
							{
								text: "Messages",
								to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.MESSAGES.path,
							},
							{
								text: "Profile",
								to: ROUTES.TASTEMAKER_DASHBOARD.CUSTOM_DATES.PROFILE.path,
							},
						]}
					/> */}
						{/* {isLoggedIn("admin") && (
							<Navbar.Link
								to={ROUTES.ADMIN.DASHBOARD.DATE_EXPERIENCES.path}
								text="Admin"
							/>
						)} */}
						<Navbar.Link to={$path("/account-settings")} text="Account" />
						<Navbar.ButtonAsLink action={$path("/api/logout")} text="Log out" />
					</HStack>
					{isOnFreeDates && (
						<Link className={linkAsButton} to={$path("/free-date/create")}>
							Create new date
						</Link>
					)}
				</HStack>
			</Desktop>
		</Navbar>
	)
}
