export function useAuth() {
	// const fetcher = useFetcher<typeof loader>()
	// const mixpanel = useMixpanel()
	// const { data } = useQuery(ViewerIsLoggedInDocument)

	// function isLoggedIn(role?: string) {
	// 	const user = data?.viewer
	// 	if (!user) {
	// 		return false
	// 	}
	// 	if (role) {
	// 		return user.role.name === role
	// 	}
	// 	return true
	// }

	// function getViewerUsername() {
	// 	const user = data?.viewer
	// 	if (!user) {
	// 		return ""
	// 	}
	// 	return user.username
	// }

	// function getViewerId() {
	// 	const user = data?.viewer
	// 	if (!user) {
	// 		return ""
	// 	}
	// 	return user.id
	// }

	// async function logout(redirectPath?: string) {
	// 	// mixpanel.reset()
	// 	await logoutUser({
	// 		onCompleted(data) {
	// 			match(data.logout)
	// 				.with({ __typename: "AuthError" }, () => {
	// 					// TODO: Handle error
	// 				})
	// 				.with({ __typename: "Error" }, () => {
	// 					// TODO: Handle error
	// 				})
	// 				.with({ __typename: "LogoutResult" }, async () => {
	// 					await client.resetStore()
	// 					navigate(redirectPath || $path("/"), { replace: true })
	// 				})
	// 				.otherwise(() => null)
	// 		},
	// 	})
	// }

	function isLoggedIn() {
		return true
	}

	function logout() {}

	function getViewerUsername() {
		return ""
	}

	function getViewerId() {
		return ""
	}

	return {
		isLoggedIn,
		logout,
		getViewerUsername,
		getViewerId,
	}
}
