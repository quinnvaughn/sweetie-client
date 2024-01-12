import { $path } from "remix-routes"
import { useViewer } from "~/hooks"
import { Navbar } from "."
import { loader } from "~/root"
import { useRouteLoaderData } from "@remix-run/react"

export function LoggedInActions() {
	const { isLoggedIn } = useViewer()
	const result = useRouteLoaderData<typeof loader>("root")
	return (
		<>
			<Navbar.Link
				to={$path("/tastemaker/free-dates/created")}
				text={result?.data?.viewer?.hasCreatedADate ? 'Tastemaker Dashboard' : 'Become a Tastemaker'}
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
