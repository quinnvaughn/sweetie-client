import { $path } from "remix-routes"
import { SingleCityCombobox } from "~/features/city"
import { Input } from "~/features/ui"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	redirectTo: string
}

export function CreateLocationForm({ redirectTo }: Props) {
	return (
		<VStack gap={2} alignItems="flex-start">
			<p className={css({ textStyle: "paragraph" })}>
				We strongly recommend you use the search tab to find the location
				through Google's API instead of this. Only use this if you can't find
				the location through the search tab.
			</p>
			<Input
				required
				label="Location name"
				name="name"
				placeholder="Enter a location name"
			/>
			<Input
				required
				label="Street"
				name="address.street"
				placeholder="Enter the street"
			/>
			<HStack
				gap={1}
				justifyContent="space-between"
				alignItems={"flex-start"}
				width={"100%"}
			>
				<SingleCityCombobox
					required
					label="City"
					fields={{
						city: "address.city",
						text: "address.cityText",
						state: "address.state",
					}}
				/>
				<Input
					required
					label="ZIP"
					name="address.postalCode"
					placeholder="Zip code"
				/>
			</HStack>
			<Input
				label="Website URL"
				name="website"
				placeholder="Enter the website"
			/>
			<input type="hidden" name="redirectTo" value={redirectTo} />
		</VStack>
	)
}
