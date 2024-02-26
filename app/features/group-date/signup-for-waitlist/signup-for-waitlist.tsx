import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { $path } from "remix-routes"
import { CodeInput, GetUserToSignUpModal } from "~/features/ui"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props<T extends FieldValues> = {
	groupDateId: string
	control: Control<T>
	fields: {
		code: Path<T>
	}
}

export function SignupForWaitlist<T extends FieldValues>({
	control,
	fields,
	groupDateId,
}: Props<T>) {
	const { isLoggedIn } = useViewer()
	const [open, setIsOpen] = useState(false)
	const fetcher = useFetcher()
	const { field } = useController({
		name: fields.code,
		control,
	})
	function signupForWaitlist() {
		fetcher.submit(
			field.value.length === 6
				? {
						code: field.value,
						groupDateId,
				  }
				: {
						groupDateId,
				  },
			{
				method: "post",
				action: $path("/api/signup-for-waitlist"),
			},
		)
	}

	return (
		<VStack
			gap={6}
			alignContent={"flex-start"}
			justifyContent={"flex-start"}
			className={css({
				border: "1px solid",
				borderColor: "gray",
				borderRadius: "8px",
				padding: "16px",
				width: "100%",
			})}
		>
			{!isLoggedIn() && (
				// add a pop up to login
				<>
					<p>
						<button
							type="button"
							className={css({
								color: "secondary",
								fontWeight: "bold",
								cursor: "pointer",
							})}
							onClick={() => setIsOpen(true)}
						>
							Login
						</button>{" "}
						to sign up for the wailist
					</p>
					{open && (
						<GetUserToSignUpModal
							onClose={() => setIsOpen(false)}
							onSuccess={() => setIsOpen(false)}
							headingText="Sign up for the waitlist"
							bodyText="You need to be logged in to sign up for the waitlist. If you don't have an account, you can create one for free."
						/>
					)}
				</>
			)}
			<button
				className={css({
					width: "100%",
					padding: "16px 8px",
					borderRadius: "8px",
					backgroundColor: "primary",
					color: "white",
					fontWeight: "bold",
					cursor: "pointer",
					_disabled: {
						opacity: 0.5,
						cursor: "not-allowed",
					},
					_hover: {
						filter: "brightness(110%)",
					},
				})}
				type="button"
				onClick={signupForWaitlist}
				disabled={!isLoggedIn()}
			>
				Signup for the waitlist
			</button>
			<p className={css({ textAlign: "center" })}>
				If you have a group code, enter it here. If you don't have a group code,
				leave this field blank.
			</p>
			<CodeInput control={control} name={fields.code} numDigits={6} />
		</VStack>
	)
}
