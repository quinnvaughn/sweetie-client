import { useGoogleLogin } from "@react-oauth/google"
import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc/index.js"
import { $path } from "remix-routes"
import { isTypeofFieldError } from "~/lib"
import { css } from "~/styled-system/css"

type Props = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	fetcher: ReturnType<typeof useFetcher<any>>
	type: "login" | "register"
}

export function CustomLoginWithGoogleButton({ fetcher, type }: Props) {
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			fetcher.submit(
				{ code: tokenResponse.code, type: "google" },
				{ method: "post", action: $path("/api/custom-signup") },
			)
		},
		flow: "auth-code",
		ux_mode: "popup",
		include_granted_scopes: false,
	})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!isTypeofFieldError(fetcher.data) && fetcher.data?.message) {
			setError(fetcher.data.message)
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
