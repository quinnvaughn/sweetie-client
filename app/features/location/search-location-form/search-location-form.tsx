import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { GoogleLocationCombobox } from ".."

export function SearchLocationForm() {
	return (
		<VStack gap={2} alignItems="flex-start" width={"100%"}>
			<p className={css({ textStyle: "paragraph" })}>
				This uses Google's Places API and filters on cities we support, so you
				might need to type most of the name or address before it appears.
			</p>
			<GoogleLocationCombobox label="Find a location" required />
		</VStack>
	)
}
