import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { $params, $path } from "remix-routes"

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = $params("/experience/:id", params)
	// redirect user to equivalent free date page.
	return redirect($path("/free-date/:id", { id }))
}
