import { Link, useFetcher, useLocation } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { useState } from "react"
import { $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { LoginWithGoogleButton } from "~/features/auth"
import { Input, Modal } from "~/features/ui"
import { ModalBody } from "~/features/ui/modal/body"
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

type Props = {
	onClose: () => void
}

export function SignupModal({ onClose }: Props) {
	const [authState, setAuthState] = useState<AuthState>("register")
	const { pathname } = useLocation()
	const fetcher = useFetcher()

	return (
		<ValidatedForm
			validator={authState === "login" ? loginValidator : registerValidator}
			method="post"
			fetcher={fetcher}
			action={
				authState === "login"
					? $path("/login", [["utm_source", "signup-modal"]])
					: $path("/register", [["utm_source", "signup-modal"]])
			}
		>
			<Modal>
				<Modal.Header
					type="button"
					title={authState === "login" ? "Login" : "Create an account"}
					onClick={onClose}
				/>
				<ModalBody>
					<VStack gap={2} alignItems={"center"}>
						<p className={css({ textAlign: "center" })}>
							Looks like you're enjoying Sweetie. Embark on a personalized
							dating adventure – register now for exclusive perks and a touch of
							magic!
						</p>
						<LoginWithGoogleButton
							redirectTo={pathname}
							type={authState === "login" ? "login" : "register"}
						/>
						<p className={css({ textAlign: "center" })}>or</p>
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
								Create an account
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
						disabled: fetcher.state === "submitting",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}
