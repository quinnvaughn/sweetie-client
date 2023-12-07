import { DataFunctionArgs, redirect } from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { signupModal } from "~/cookies.server"

export async function action({ request }: DataFunctionArgs) {
	const cookieHeaders = request.headers.get("Cookie")
	const bodyParams = await request.formData()
	const headers = new Headers()
	const cookie = (await signupModal.parse(cookieHeaders)) || {
		showSignupModal: false,
		clearedModal: false,
	}
	cookie.showSignupModal = false
	cookie.clearedModal = true
	headers.append("Set-Cookie", await signupModal.serialize(cookie))
	return redirect(
		$path("/free-date/:id", { id: bodyParams.get("id") as string }),
		{
			headers,
		},
	)
}
