import { $path } from "remix-routes"
import { useViewer } from "~/hooks"
import { Navbar } from "."

export function LoggedInActions() {
	const { isLoggedIn } = useViewer()
	return (
		<>
			<Navbar.Link
				to={$path("/tastemaker/free-dates/created")}
				text="Tastemaker Dashboard"
			/>
			{isLoggedIn("admin") && (
				<Navbar.Link to={"/admin/dashboard/free-dates"} text="Admin" />
			)}
			<Navbar.Link to={"/account-settings"} text="Account" />
			<Navbar.Link to={$path("/dates")} text="Dates" />
			<Navbar.Link to={$path("/favorites")} text="Favorites" />
			<Navbar.ButtonAsLink action={$path("/api/logout")} text="Log out" />
		</>
	)
}
