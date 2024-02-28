import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { $path } from "remix-routes"
import { CodeInput, GetUserToSignUpModal, Modal } from "~/features/ui"
import { useViewer } from "~/hooks"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

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
}

export function FloatingSignupForWaitlist<T extends FieldValues>({
	groupDateId,
	control,
	fields,
}: Props<T>) {
	const { isLoggedIn } = useViewer()
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
	const [open, setIsOpen] = useState(false)
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
		<div
			className={container({
				visible: showFloatingButton,
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
				onClick={() => setOpenModal(true)}
				disabled={!isLoggedIn()}
			>
				Signup for the waitlist
			</button>
			{openModal && (
				<Modal>
					<Modal.Header
						type="button"
						onClick={() => setOpenModal(false)}
						title="Sign up for the waitlist"
					/>
					<Modal.Body>
						<VStack
							gap={6}
							alignContent={"flex-start"}
							justifyContent={"flex-start"}
							width={"100%"}
						>
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
								If you have a group code, enter it here. If you don't have a
								group code, leave this field blank.
							</p>
							<CodeInput control={control} name={fields.code} numDigits={6} />
						</VStack>
					</Modal.Body>
				</Modal>
			)}
		</div>
	)
}
