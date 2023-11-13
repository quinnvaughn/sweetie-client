import { useViewer } from "~/hooks"
import { Navbar } from "."
import { $path } from "remix-routes"

export function LoggedInActions() {
	const { isLoggedIn } = useViewer()
	return (
		<>
			{/* <Navbar.Link
				to={ROUTES.DATES_DASHBOARD.CUSTOM_DATES.REQUESTS.path}
				text="Dates"
			/> */}
			<Navbar.Link
				to={$path("/tastemaker/free-dates/created")}
				text="Create dates"
			/>
			{isLoggedIn("admin") && (
				<Navbar.Link to={"/admin/dashboard/free-dates"} text="Admin" />
			)}
			<Navbar.Link to={"/account-settings"} text="Account" />
			<Navbar.ButtonAsLink action={$path("/api/logout")} text="Log out" />
		</>
	)
}
