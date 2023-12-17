import { useGoogleLogin } from "@react-oauth/google"
import { useFetcher, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc/index.js"
import { $path } from "remix-routes"
import { action } from "~/routes/api.login-with-google"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export function AddGoogleCalendar() {
	const { pathname } = useLocation()
	const fetcher = useFetcher<typeof action>()
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			fetcher.submit(
				{ code: tokenResponse.code, redirectTo: pathname },
				{ method: "post", action: $path("/api/login-with-google") },
			)
		},
		flow: "auth-code",
		ux_mode: "popup",
		scope: "https://www.googleapis.com/auth/calendar.events",
	})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (fetcher.data?.error) {
			setError(fetcher.data.error)
		}
	}, [fetcher.data])

	return (
		<VStack gap={error ? 2 : 0} width={"100%"}>
			<button
				className={css({
					padding: "8px",
					borderRadius: "8px",
					borderColor: "gray",
					border: "1px solid",
					width: "100%",
					cursor: "pointer",
				})}
				type="button"
				onClick={login}
			>
				<div
					className={css({
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 1,
					})}
				>
					<FcGoogle size={20} /> <span>Connect your Google Calendar</span>
				</div>
			</button>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</VStack>
	)
}
