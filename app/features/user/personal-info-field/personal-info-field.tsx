import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	label: string
	value: string
}

export function PersonalInfoField({ label, value }: Props) {
	return (
		<VStack gap={1} alignItems="flex-start">
			<div className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
				{label}
			</div>
			<div className={css({ textStyle: "paragraph", color: "grayText" })}>
				{value}
			</div>
		</VStack>
	)
}
