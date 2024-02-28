import { Form } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import { match } from "ts-pattern"
import { GetUserToSignUpModal } from "~/features/ui"
import { useViewer } from "~/hooks"
import { css, cva } from "~/styled-system/css"
import { SignupForTheWaitlistModal } from ".."

const container = cva({
	base: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
		padding: "10px 20px",
		background: "white",
		borderTop: "1px solid",
		borderTopColor: "gray",
		display: "flex",
		gap: 2,
		flexDirection: "column",
		alignItems: "center",
		zIndex: 10,
		transition: "all 0.2s",
	},
	variants: {
		visible: {
			true: {
				opacity: 1,
			},
			false: {
				opacity: 0,
			},
		},
	},
})

type Props<T extends FieldValues> = {
	groupDateId: string
	control: Control<T>
	fields: {
		code: Path<T>
	}
	onSubmit: () => void
}

export function FloatingSignupForWaitlist<T extends FieldValues>({
	groupDateId,
	control,
	fields,
	onSubmit,
}: Props<T>) {
	const { isLoggedIn } = useViewer()
	const [openModal, setOpenModal] = useState(false)

	const [scrollY, setScrollY] = useState(0)
	const [showFloatingButton, setShowFloatingButton] = useState(true)
	// if the user stops scrolling for a while, show the floating button
	const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
		null,
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollTimeout) {
			clearTimeout(scrollTimeout)
		}
		setScrollTimeout(
			setTimeout(() => {
				setShowFloatingButton(true)
			}, 3000),
		)
	}, [scrollY])
	// check if user is scrolling down or up
	// if down, hide the floating button
	// if up, show the floating button
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const currentScrollY = window.scrollY
			// user is scrolling down
			// add a threshold to prevent the button from hiding when user is scrolling down a little bit
			if (currentScrollY > scrollY + 100) {
				setScrollY(currentScrollY)
				setShowFloatingButton(false)
				return
				// add a threshold to prevent the button from showing when user is scrolling up a little bit
			} else if (currentScrollY < scrollY - 100) {
				setScrollY(currentScrollY)
				setShowFloatingButton(true)
				return
			}
		})
		return () => window.removeEventListener("scroll", () => {})
	}, [scrollY])

	return (
		<Form onSubmit={onSubmit}>
			<div
				className={container({
					visible: showFloatingButton,
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
			</div>
		</Form>
	)
}
