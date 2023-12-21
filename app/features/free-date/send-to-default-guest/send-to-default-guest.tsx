import { useControlField } from "remix-validated-form"
import { Checkbox } from "~/features/ui"
import { HStack } from "~/styled-system/jsx"

type Props = {
	name: string
	label: string
	defaultValue?: boolean
	guest: {
		email: {
			name: string
			value: string
		}
		name: {
			name: string
			value: string
		}
	}
}

export function SendToDefaultGuest({ name, label, guest }: Props) {
	const [value, setValue] = useControlField<boolean>(name)
	return (
		<HStack width={"100%"} justifyContent={"flex-start"}>
			<Checkbox
				name={name}
				label={label}
				defaultChecked={value}
				value={String(value)}
				onChange={(e) => setValue(e.target.checked)}
			/>
			<input
				type="hidden"
				name={guest.email.name}
				value={value === true ? guest.email.value : ""}
			/>
			<input
				type="hidden"
				name={guest.name.name}
				value={value === true ? guest.name.value : ""}
			/>
		</HStack>
	)
}
