import { Link } from "@remix-run/react"
import { HStack } from "~/styled-system/jsx"
import { Button } from ".."

type Props = {
	button?: {
		text: string
	}
	cancel?: {
		text: string
		to: string
	}
}

export function ModalFooter({ button: buttonProps, cancel }: Props) {
	return (
		<HStack
			gap={4}
			justifyContent="space-between"
			alignItems="center"
			padding={"16px"}
			borderTop={"1px solid"}
			borderTopColor={"gray"}
		>
			{cancel ? <Link to={cancel.to}>{cancel.text}</Link> : <div />}
			{buttonProps && (
				<Button type="submit" variant={"black"} size={"lg"}>
					{buttonProps?.text}
				</Button>
			)}
		</HStack>
	)
}
