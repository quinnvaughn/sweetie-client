import { Control, FieldValues, Path } from "react-hook-form"
import { CodeInput, Modal } from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props<T extends FieldValues> = {
	onClose: () => void
	control: Control<T>
	fields: {
		code: Path<T>
	}
}

export function SignupForTheWaitlistModal<T extends FieldValues>({
	onClose,
	control,
	fields,
}: Props<T>) {
	return (
		<Modal>
			<Modal.Header
				type="button"
				onClick={onClose}
				title="Sign up for the waitlist"
			/>
			<Modal.Body>
				<VStack gap={6} width={"100%"}>
					<p className={css({ textAlign: "center" })}>
						If you have a group code, enter it here. If you don't have a group
						code, leave this field blank.
					</p>
					<CodeInput control={control} name={fields.code} numDigits={6} />
				</VStack>
			</Modal.Body>
			<Modal.Footer button={{ text: "Sign up" }} />
		</Modal>
	)
}
