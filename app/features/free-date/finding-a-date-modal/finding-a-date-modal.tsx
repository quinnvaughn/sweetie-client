import { useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { Input, Modal, Textarea } from "~/features/ui"
import { useViewer } from "~/hooks"
import { isTypeofFieldError } from "~/lib"
import { action } from "~/routes/api.help-finding-a-date"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export const helpFindingADateValidator = withZod(
	z.object({
		email: z.string().email("Must be a valid email.").optional(),
		name: z.string().min(2, "Must be at least 2 characters.").optional(),
		lookingFor: z.string().min(10, "Must be at least 10 characters."),
	}),
)

type Props = {
	onClose: () => void
	title?: string
	bodyText?: string
}

export function FindingADateModal({
	onClose,
	title = "Get help finding a date",
	bodyText = "We're here to help you find a date you'll love. We'll get back to you within 24 hours.",
}: Props) {
	const { isLoggedIn } = useViewer()
	const fetcher = useFetcher<typeof action>()
	return (
		<ValidatedForm
			fetcher={fetcher}
			validator={helpFindingADateValidator}
			method="post"
			action={$path("/api/help-finding-a-date")}
		>
			<Modal>
				<Modal.Header type="button" onClick={onClose} title={title} />
				<Modal.Body>
					{!isTypeofFieldError(fetcher.data) && fetcher.data?.success ? (
						<VStack>
							<p
								className={css({
									textStyle: "paragraph",
									textAlign: "center",
								})}
							>
								Thanks for reaching out! We'll get back to you within 24 hours.
							</p>
						</VStack>
					) : (
						<VStack gap={3}>
							<p
								className={css({
									textStyle: "paragraph",
									textAlign: "center",
								})}
							>
								{bodyText}
							</p>
							{!isLoggedIn() && (
								<>
									<Input required label="Your email" name="email" />
									<Input required label="Your name" name="name" />
								</>
							)}
							<Textarea
								required
								placeholder="Ideally tell us the general area or theme or price range you're looking for. Anything that will help us find something you'll like."
								label="What are you looking for?"
								name="lookingFor"
							/>
						</VStack>
					)}
				</Modal.Body>
				{!isTypeofFieldError(fetcher.data) && !fetcher.data?.success && (
					<Modal.Footer
						button={{
							text: "Submit",
							disabled: fetcher.state === "submitting",
						}}
					/>
				)}
			</Modal>
		</ValidatedForm>
	)
}
