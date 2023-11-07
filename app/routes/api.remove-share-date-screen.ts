import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { $path } from "remix-routes"
import { showShareScreen } from "~/cookies.server"

export async function action({ request }: ActionFunctionArgs) {
	const cookieHeaders = request.headers.get("Cookie")
	const cookie = (await showShareScreen.parse(cookieHeaders)) || {}
	cookie.showShareScreen = false
	const bodyParams = await request.formData()
	return redirect(
		$path("/free-date/:id", { id: bodyParams.get("id") as string }),
		{
			headers: {
				"Set-Cookie": await showShareScreen.serialize(cookie),
			},
		},
	)
}
