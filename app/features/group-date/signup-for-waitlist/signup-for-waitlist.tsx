import { Form } from "@remix-run/react"
import { useState } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import { match } from "ts-pattern"
import { CodeInput, GetUserToSignUpModal, Modal } from "~/features/ui"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { SignupForTheWaitlistModal } from ".."

type Props<T extends FieldValues> = {
	control: Control<T>
	fields: {
		code: Path<T>
	}
	onSubmit: () => void
}

export function SignupForWaitlist<T extends FieldValues>({
	control,
	fields,
	onSubmit,
}: Props<T>) {
	const { isLoggedIn } = useViewer()
	const [openModal, setOpenModal] = useState(false)

	return (
		<Form onSubmit={onSubmit}>
			<VStack
				width={"100%"}
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
					<p className={css({ textAlign: "center" })}>
						You will be asked to sign up or in before you can be added to the
						waitlist.
					</p>
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
					onClick={() => setOpenModal(true)}
				>
					Signup for the waitlist
				</button>
				{openModal &&
					match(isLoggedIn())
						.with(true, () => (
							<SignupForTheWaitlistModal
								onClose={() => setOpenModal(false)}
								control={control}
								fields={fields}
							/>
						))
						.with(false, () => (
							<GetUserToSignUpModal
								onClose={() => setOpenModal(false)}
								headingText="Sign up to join the waitlist"
								onSuccess={() => {}}
								bodyText="You need to be logged in to sign up for the waitlist. If you don't have an account, you can create one for free."
							/>
						))
						.exhaustive()}
			</VStack>
		</Form>
	)
}
