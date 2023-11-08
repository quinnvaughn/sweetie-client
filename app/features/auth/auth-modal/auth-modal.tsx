import { Link } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { useState } from "react"
import { $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { Modal, Input } from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

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

const authButton = css({
	cursor: "pointer",
	textDecoration: "underline",
	fontWeight: "bold",
})

type AuthState = "login" | "register"

type Props = {
	defaultScreen?: AuthState
	redirectTo?: string
	onCloseLink: string
}

export function AuthModal({
	defaultScreen = "login",
	redirectTo = $path("/"),
	onCloseLink,
}: Props) {
	const [authState, setAuthState] = useState<AuthState>(defaultScreen)
	return (
		<ValidatedForm
			validator={authState === "login" ? loginValidator : registerValidator}
			method="post"
			action={authState === "login" ? $path("/login") : $path("/register")}
		>
			<Modal>
				<Modal.Header
					to={onCloseLink}
					title={authState === "login" ? "Login" : "Register"}
				/>
				<Modal.Body>
					<VStack gap="4" alignItems={"center"}>
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
						<input type="hidden" name="redirectTo" value={redirectTo} />
					</VStack>
				</Modal.Body>
				<Modal.Footer
					button={{
						text: authState === "login" ? "Login" : "Register",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}
