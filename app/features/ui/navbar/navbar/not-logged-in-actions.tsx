import { useLocation } from "@remix-run/react"
import { Navbar } from "."
import { $path } from "remix-routes"

export function NotLoggedInActions() {
	const { pathname } = useLocation()
	return (
		<>
			{pathname !== "/login" && (
				<Navbar.Link to={$path("/login")} text="Login" />
			)}
			{pathname !== "/register" && (
				<Navbar.Link to={$path("/register")} text="Register" />
			)}
		</>
	)
}
