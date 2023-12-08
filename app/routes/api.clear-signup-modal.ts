import { DataFunctionArgs, redirect } from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { signupModal } from "~/cookies.server"

export async function action({ request }: DataFunctionArgs) {
	const cookieHeaders = request.headers.get("Cookie")
	const bodyParams = await request.formData()
	const headers = new Headers()
	const cookie = (await signupModal.parse(cookieHeaders)) || {
		showSignupModal: false,
		clearedSignupModal: true,
		timesLookedAtDates: 0,
	}
	headers.append(
		"Set-Cookie",
		await signupModal.serialize({
			...cookie,
			showSignupModal: false,
			clearedSignupModal: true,
		}),
	)
	return redirect(
		$path("/free-date/:id", { id: bodyParams.get("id") as string }),
		{
			headers,
		},
	)
}
