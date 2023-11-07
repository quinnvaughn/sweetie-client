import { useRouteLoaderData } from "@remix-run/react"
import { loader } from "../../root"

export function useViewer() {
	const result = useRouteLoaderData<typeof loader>("root")

	function isLoggedIn(role?: string) {
		if (!result?.data?.viewer) return false
		return role ? result.data?.viewer?.role.name === role : true
	}

	function getViewerUsername() {
		return result?.data?.viewer?.username ?? ""
	}

	function getViewerId() {
		return result?.data?.viewer?.id ?? ""
	}

	return {
		isLoggedIn,
		getViewerUsername,
		getViewerId,
	}
}
