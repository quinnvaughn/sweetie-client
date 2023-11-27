import { useFetcher } from "@remix-run/react"
import { FiSave } from "react-icons/fi/index.js"
import { $path } from "remix-routes"
import { useFormContext } from "remix-validated-form"
import { Button, Desktop } from "~/features/ui"
import { action } from "~/routes/api.save-draft"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	formId: string
}

export function SaveDraftButton({ formId }: Props) {
	const fetcher = useFetcher<typeof action>()
	const { getValues } = useFormContext(formId)
	function saveDraft() {
		fetcher.submit(getValues(), {
			method: "post",
			action: $path("/api/save-draft"),
		})
	}

	return (
		<VStack gap={1} alignItems="flex-end">
			<Button
				variant="tertiary"
				size="sm"
				onClick={saveDraft}
				icon={
					<FiSave
						className={css({
							width: { base: "24px", md: "22px" },
							height: { base: "24px", md: "22px" },
						})}
					/>
				}
			>
				<Desktop>Save draft</Desktop>
			</Button>
			{/* {formError && (
				<Text as="p" fontSize={12} color="red">
					{formError}
				</Text>
			)} */}
		</VStack>
	)
}
