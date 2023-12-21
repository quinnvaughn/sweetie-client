import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string
}

export function Checkbox({ label, ...props }: Props) {
	return (
		<HStack gap={1} alignItems="center">
			<input
				{...props}
				type="checkbox"
				className={css({ _hover: { cursor: "pointer" } })}
			/>
			<label>{label}</label>
		</HStack>
	)
}
