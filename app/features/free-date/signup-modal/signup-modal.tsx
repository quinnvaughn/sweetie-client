import { Link, useFetcher, useLocation, useParams } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { useState } from "react"
import { $params, $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { Input, Modal } from "~/features/ui"
import { ModalBody } from "~/features/ui/modal/body"
import { useTrack } from "~/hooks"
import { action } from "~/routes/api.clear-signup-modal"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type AuthState = "login" | "register"

const authButton = css({
	cursor: "pointer",
	textDecoration: "underline",
	fontWeight: "bold",
})

const loginValidator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
	}),
)

const registerValidator = withZod(
	z.object({
		email: z.string().email("Must be a valid email"),
		password: z.string().min(6, "Must be at least 6 characters"),
		name: z.string().min(1, "Must be at least 1 character"),
	}),
)

export function SignupModal() {
	const [authState, setAuthState] = useState<AuthState>("register")
	const { pathname } = useLocation()
	const params = useParams()
	const { id } = $params("/free-date/:id", params)
	const fetcher = useFetcher<typeof action>()
	const track = useTrack()

	return (
		<ValidatedForm
			validator={authState === "login" ? loginValidator : registerValidator}
			method="post"
			action={authState === "login" ? $path("/login") : $path("/register")}
		>
			<Modal>
				<Modal.Header
					type="button"
					title={authState === "login" ? "Login" : "Register"}
					onClick={() =>
						fetcher.submit(
							{ id },
							{ action: $path("/api/clear-signup-modal"), method: "POST" },
						)
					}
				/>
				<ModalBody>
					<VStack gap="4" alignItems={"center"}>
						<p className={css({ textAlign: "center" })}>
							Hey there! Looks like you're enjoying Sweetie. Create an account
							so you can add this date to your calendar for free.
						</p>
						<Input
							type="email"
							label="Email"
							required
							name="email"
							placeholder="Please enter your email"
						/>
						<Input
							label="Password"
							required
							name="password"
							placeholder="Please enter your password"
							type={"password"}
						/>
						{authState === "register" && (
							<Input
								label="Full name"
								required
								name="name"
								placeholder="Please enter your full name"
								type={"text"}
							/>
						)}
						{authState === "login" && (
							<Link
								to={$path("/forgot-password")}
								className={css({
									color: "secondary",
									fontWeight: "400",
									fontSize: "14px",
									_hover: {
										textDecoration: "underline",
									},
								})}
							>
								Forgot password?
							</Link>
						)}
						{authState === "login" ? (
							<button
								className={authButton}
								type="button"
								onClick={() => setAuthState("register")}
							>
								Register
							</button>
						) : (
							<button
								className={authButton}
								type="button"
								onClick={() => setAuthState("login")}
							>
								Already have an account?
							</button>
						)}
						<input type="hidden" name="type" value={authState} />
						<input type="hidden" name="redirectTo" value={pathname} />
					</VStack>
				</ModalBody>
				<Modal.Footer
					button={{
						text: authState === "login" ? "Login" : "Register",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}