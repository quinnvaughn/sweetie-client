import { Link, useLocation } from "@remix-run/react"
import { useState } from "react"
import { $path } from "remix-routes"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { Navbar } from ".."
import { Desktop, Mobile } from "../.."

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
										prefetch="intent"
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
								<Navbar.Link to={$path("/favorites")} text="Favorites" />
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
						<Navbar.Link to={$path("/favorites")} text="Favorites" />
						<Navbar.ButtonAsLink action={$path("/api/logout")} text="Log out" />
					</HStack>
					{isOnFreeDates && (
						<Link
							prefetch="intent"
							className={linkAsButton}
							to={$path("/free-date/create")}
						>
							Create new date
						</Link>
					)}
				</HStack>
			</Desktop>
		</Navbar>
	)
}
