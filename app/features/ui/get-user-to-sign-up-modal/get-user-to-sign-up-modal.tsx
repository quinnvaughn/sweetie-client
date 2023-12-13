import { Link } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { useEffect, useState } from "react"
import { useFetcher } from "react-router-dom"
import { $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { isTypeofFieldError } from "~/lib"
import { action } from "~/routes/api.custom-signup"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { Input, Modal } from ".."

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
	headingText: string
	bodyText?: string
	onClose: () => void
	onSuccess: () => void
}

export function GetUserToSignUpModal({
	headingText,
	bodyText,
	onClose,
	onSuccess,
}: Props) {
	const [authState, setAuthState] = useState<AuthState>("register")
	const fetcher = useFetcher<typeof action>()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// @ts-ignore
		if (!isTypeofFieldError(fetcher.data) && fetcher.data?.success) {
			onSuccess?.()
		}
	}, [fetcher.data])
	return (
		<ValidatedForm
			fetcher={fetcher}
			validator={authState === "register" ? registerValidator : loginValidator}
			method="post"
			action={$path("/api/custom-signup")}
		>
			<Modal>
				<Modal.Header type="button" onClick={onClose} title={headingText} />
				<Modal.Body>
					<VStack gap="4" alignItems={"center"}>
						{bodyText && (
							<p className={css({ textAlign: "center" })}>{bodyText}</p>
						)}
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
					</VStack>
				</Modal.Body>
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
