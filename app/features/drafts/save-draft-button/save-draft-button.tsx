import { useFetcher } from "@remix-run/react"
import { FiSave } from "react-icons/fi/index.js"
import { useRemixFormContext } from "remix-hook-form"
import { $path } from "remix-routes"
import { Button, Desktop } from "~/features/ui"
import { CreateFreeDateFormValues } from "~/forms"
import { action } from "~/routes/api.save-draft"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export function SaveDraftButton() {
	const fetcher = useFetcher<typeof action>()
	// TODO: Add toast for errors.
	const { getValues } = useRemixFormContext<CreateFreeDateFormValues>()
	function saveDraft() {
		const formData = new FormData()
		formData.append("draftId", getValues().draftId ?? "")
		formData.append("thumbnail", getValues().thumbnail)
		formData.append("nsfw", getValues().nsfw)
		formData.append("title", getValues().title)
		formData.append("description", getValues().description)
		formData.append("recommendedTime", getValues().recommendedTime)
		formData.append("orderedStops", JSON.stringify(getValues().orderedStops))
		formData.append("prep", JSON.stringify(getValues().prep))
		formData.append("tags", JSON.stringify(getValues().tags))
		fetcher.submit(formData, {
			method: "post",
			action: $path("/api/save-draft"),
		})
	}

	return (
		<VStack gap={1} alignItems="flex-end">
			<Button
				disabled={fetcher.state === "submitting"}
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
		</VStack>
	)
}
