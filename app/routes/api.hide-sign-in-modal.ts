import { DataFunctionArgs, json } from "@remix-run/server-runtime"
import { showSigninModal } from "~/cookies.server"

export async function action({ request }: DataFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie")
	const cookie = (await showSigninModal.parse(cookieHeader)) ?? {}
	cookie.showSigninModal = false

	return json(
		{},
		{
			headers: {
				"Set-Cookie": await showSigninModal.serialize(cookie),
			},
		},
	)
}
