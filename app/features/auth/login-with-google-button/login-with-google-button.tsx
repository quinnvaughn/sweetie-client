import { useGoogleLogin } from "@react-oauth/google"
import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc/index.js"
import { $path } from "remix-routes"
import { action } from "~/routes/api.login-with-google"
import { css } from "~/styled-system/css"

type Props = {
	type?: "register" | "login"
}

export function LoginWithGoogleButton({ type = "login" }: Props) {
	const fetcher = useFetcher<typeof action>()
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			fetcher.submit(
				{ code: tokenResponse.code },
				{ method: "post", action: $path("/api/login-with-google") },
			)
		},
		flow: "auth-code",
		ux_mode: "popup",
	})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (fetcher.data?.error) {
			setError(fetcher.data.error)
		}
	}, [fetcher.data])

	return (
		<>
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
					<FcGoogle size={20} />{" "}
					<span>{type === "login" ? "Login" : "Register"} with Google</span>
				</div>
			</button>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</>
	)
}
