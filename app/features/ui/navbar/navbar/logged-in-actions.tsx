import { useRouteLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { useViewer } from "~/hooks"
import { loader } from "~/root"
import { Navbar } from "."

export function LoggedInActions() {
	const { isLoggedIn } = useViewer()
	const result = useRouteLoaderData<typeof loader>("root")
	return (
		<>
			<Navbar.Link
				to={$path("/tastemaker/free-dates/created")}
				text={
					result?.data?.viewer?.hasCreatedADate
						? "Tastemaker Dashboard"
						: "Become a Tastemaker"
				}
			/>
			{isLoggedIn("admin") && <Navbar.Link to={$path("/admin")} text="Admin" />}
			<Navbar.Link to={$path("/account-settings")} text="Account" />
			<Navbar.Link to={$path("/dates")} text="Dates" />
			<Navbar.Link to={$path("/favorites")} text="Favorites" />
			<Navbar.ButtonAsLink action={$path("/api/logout")} text="Log out" />
		</>
	)
}
