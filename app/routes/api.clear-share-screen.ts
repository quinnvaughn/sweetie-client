import { DataFunctionArgs, redirect } from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { showShareScreen } from "~/cookies.server"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const id = formData.get("id") as string
	const cookieHeader = request.headers.get("Cookie")
	const cookie = await showShareScreen.parse(cookieHeader)
	cookie.showShareScreen = false

	return redirect($path("/free-date/:id", { id }), {
		headers: {
			"Set-Cookie": await showShareScreen.serialize(cookie),
		},
	})
}
