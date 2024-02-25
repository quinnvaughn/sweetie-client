import { Form, useFetcher, useParams } from "@remix-run/react"
import { useController, useFieldArray } from "react-hook-form"
import { FiPlus } from "react-icons/fi/index.js"
import { RemixFormProvider, useRemixFormContext } from "remix-hook-form"
import { $params } from "remix-routes"
import { SaveDraftButton } from "~/features/drafts"
import {
	Button,
	HookBulletPointsInput,
	HookImageUpload,
	HookInput,
	HookRadioGroup,
	HookTagsInput,
	HookTextarea,
} from "~/features/ui"
import { FreeDateFormValues } from "~/forms"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { HookRecommendedTimePicker } from ".."
import { OrderedDateStopForm } from "../ordered-date-stop-form"

type Props = {
	fetcher: ReturnType<typeof useFetcher>
	page: "create" | "edit" | "draft"
}

export function FreeDateForm({ page, fetcher }: Props) {
	// get id from url params
	const params = useParams()
	const idParams =
		page === "edit"
			? $params("/free-date/edit/:id", params)
			: $params("/free-date/draft/:id", params)
	const methods = useRemixFormContext<FreeDateFormValues>()
	const { append, fields: orderedStops } = useFieldArray<FreeDateFormValues>({
		control: methods.control,
		name: "orderedStops",
	})
	const {
		append: prepAppend,
		remove: prepRemove,
		move: prepMove,
		fields: prepFields,
	} = useFieldArray({
		control: methods.control,
		name: "prep",
	})
	const { field: formError } = useController({
		control: methods.control,
		name: "formError",
	})

	return (
		<Form onSubmit={methods.handleSubmit}>
			<VStack gap={4} alignItems="flex-start">
				<HStack
					gap={1}
					justifyContent="space-between"
					alignItems="flex-start"
					width={"100%"}
				>
					<h1
						className={css({
							textStyle: "h1",
							fontSize: { base: "24px", md: "32px" },
						})}
					>
						{page === "create"
							? "Create a free date"
							: page === "edit"
							? "Edit free date"
							: "Edit draft"}
					</h1>
					{page !== "edit" && (
						<RemixFormProvider {...methods}>
							<SaveDraftButton />
						</RemixFormProvider>
					)}
				</HStack>
				<HookImageUpload
					required
					control={methods.control}
					folder="free-dates"
					name="thumbnail"
					label="Thumbnail"
				/>
				<HookInput
					label="Title"
					placeholder="Enter a title that is sure to grab attention"
					required
					control={methods.control}
					name="title"
				/>
				<HookTextarea
					label="Description"
					placeholder="Provide a brief synopsis of your date idea that will entice users to keep reading"
					required
					control={methods.control}
					name="description"
				/>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Add some tags. These will help users find your date. They can be
						whatever you want.
					</p>
					<HookTagsInput label="Tags" />
				</VStack>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						When is the best time to go on this date? We automatically add times
						both half an hour before and after the time you select.
					</p>
					<HookRecommendedTimePicker
						label="Recommended time"
						name="recommendedTime"
						required
						control={methods.control}
						defaultDisplayedTimes={[
							{ tab: 0, text: "5:30 PM", value: "5:30 PM" },
							{ tab: 1, text: "6:00 PM", value: "6:00 PM" },
							{ tab: 2, text: "6:30 PM", value: "6:30 PM" },
						]}
					/>
				</VStack>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Is this date not safe for work (NSFW)?
					</p>
					<HookRadioGroup
						name="nsfw"
						control={methods.control}
						required
						label="NSFW"
						options={[
							{
								label: "Yes",
								value: "true",
							},
							{
								label: "No",
								value: "false",
							},
						]}
					/>
				</VStack>
				<VStack gap={4} alignItems="flex-start" width={"100%"}>
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Any preparation steps recommended for this date? If so, please list
						them here. These could be things like making a reservation,
						reserving an Uber, buying tickets or flowers, or bringing a picnic
						blanket.
					</p>
					<HookBulletPointsInput
						label="Preparation steps"
						placeholder="Enter a preparation step"
						control={methods.control}
						textName="prepText"
						values={prepFields.map((field) => field)}
						onAdd={(value) => {
							prepAppend({ text: value, id: new Date().getTime().toString() })
							methods.setValue("prepText", "")
						}}
						onRemove={(index) => prepRemove(index)}
						onMove={(from, to) => prepMove(from, to)}
					/>
				</VStack>
				<VStack gap={4} paddingBottom={"40px"} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Feel free to add at least 3 stops to your date itinerary below. Each
						stop can be tailored with different options to choose from. For
						example, if there are a couple restaurants in the area, you can add
						both and let the user decide which one they want to go to. If you
						only have one option, that's fine too. Just add it and move on to
						the next stop.
					</p>
					<RemixFormProvider {...methods}>
						{orderedStops.map((stop, index) => (
							<OrderedDateStopForm
								id={idParams.id}
								key={stop.id}
								order={index + 1}
								page={page}
							/>
						))}
					</RemixFormProvider>
					<Button
						variant="black"
						size="md"
						icon={<FiPlus className={css({ color: "white" })} />}
						onClick={() =>
							append({
								optional: "false",
								options: [
									{
										content: "",
										title: "",
										optionOrder: 1,
										location: { id: "", name: "" },
									},
								],
								order: orderedStops.length + 1,
								estimatedTime: "1:00",
							})
						}
					>
						Add another stop
					</Button>
				</VStack>
				<div
					className={css({
						width: "100%",
						display: "flex",
						justifyContent: "flex-end",
					})}
				>
					<Button
						type="submit"
						size="xl"
						variant="primary"
						disabled={
							fetcher.state === "submitting" || !methods.formState.isValid
						}
					>
						{page === "create" || page === "draft"
							? "Create new date"
							: "Edit date"}
					</Button>
				</div>
				{formError.value && (
					<p className={css({ textStyle: "error" })}>{formError.value}</p>
				)}
			</VStack>
		</Form>
	)
}
