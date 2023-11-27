import { withZod } from "@remix-validated-form/with-zod"
import { FiPlus } from "react-icons/fi/index.js"
import {
	ValidatedForm,
	useControlField,
	useFieldArray,
} from "remix-validated-form"
import { z } from "zod"
import { zfd } from "zod-form-data"
import {
	Input,
	Textarea,
	TagsInput,
	CheckboxGroup,
	RadioGroup,
	Button,
	SubmitButton,
	ImageUpload,
} from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack, HStack } from "~/styled-system/jsx"
import { DateStopForm } from ".."
import { SaveDraftButton } from "~/features/drafts"

const schema = z.object({
	id: z.string().optional(),
	thumbnail: z
		.string({
			invalid_type_error: "Must be a url",
			required_error: "Thumbnail is required.",
		})
		.url("Thumbnail is required."),
	nsfw: z.union([z.literal("true"), z.literal("false")], {
		required_error: "NSFW is required.",
	}),
	tagText: z.string().optional(),
	title: z
		.string()
		.min(5, "Title must be at least 5 characters.")
		.max(500, "Title must be no more than 500 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters.")
		.max(10000, "Description must be no more than 10,000 characters."),
	timesOfDay: zfd
		.repeatable(
			z.array(zfd.text()).min(1, "Must select at least one time of day."),
		)
		.refine(
			(data) => {
				// not sure why I have to do this, but it works
				if (!data) return false
				if (data.length < 1) return false
				return true
			},
			{ message: "Must select at least one time of day." },
		),
	tags: zfd.repeatableOfType(z.string()).optional(),
	stops: z.array(
		z.object({
			title: z
				.string()
				.min(5, "Title must be at least 5 characters.")
				.max(500, "Title must be no more than 500 characters."),
			content: z
				.string()
				.min(100, "Content must be at least 100 characters.")
				.max(100000, "Content must be no more than 100,000 characters."),
			location: z.object({
				id: z.string(),
				name: z.string().min(1, "Must select a location."),
			}),
		}),
	),
})

export const freeDateValidator = withZod(schema)

type Stop = {
	title: string
	content: string
	location: {
		id: string
		name: string
	}
}

export type FreeDateFormValues = z.infer<typeof schema>

type Props = {
	formId: string
	page: "create" | "edit" | "draft"
	error?: string
	locationPath: string
}

export function FreeDateForm({ formId, page, error, locationPath }: Props) {
	const [stops, { push, remove, move }] = useFieldArray<Stop>("stops", {
		formId,
	})
	const [id] = useControlField<string>("id", formId)
	return (
		<ValidatedForm id={formId} validator={freeDateValidator} method="post">
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
					{page !== "edit" && <SaveDraftButton formId={formId} />}
				</HStack>
				{page !== "create" && (
					<input
						type="hidden"
						name="id"
						value={id?.length > 0 ? id : undefined}
					/>
				)}
				<ImageUpload
					folder="free-dates"
					name="thumbnail"
					label="Thumbnail (We strongly recommend landscape images)"
					required
				/>
				<Input
					required
					name="title"
					label="Title"
					placeholder="Enter a title that is sure to grab attention"
				/>
				<Textarea
					required
					name="description"
					label="Description"
					placeholder="Provide a brief synopsis of your date experience that will entice users to keep reading"
				/>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Add some tags. These will help users find your date. They can be
						whatever you want.
					</p>
					<TagsInput label="Tags" tagsName="tags" textName="tagText" />
				</VStack>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Select the times of day that your date is best suited for.
					</p>
					<CheckboxGroup
						required
						label="Times of day"
						name={"timesOfDay"}
						options={[
							{ label: "Morning", value: "morning", defaultChecked: true },
							{
								label: "Afternoon",
								value: "afternoon",
								defaultChecked: true,
							},
							{ label: "Evening", value: "evening", defaultChecked: true },
							{ label: "Late night", value: "late night" },
						]}
					/>
				</VStack>
				<VStack gap={4} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Is this date not safe for work (NSFW)?
					</p>
					<RadioGroup
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
								defaultChecked: true,
							},
						]}
						name="nsfw"
					/>
				</VStack>
				<VStack gap={4} paddingBottom={"40px"} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						We strongly encourage you to have at least three date stops. While
						not required, we believe that having more stops will make your date
						more fun and interesting.
					</p>
					{stops.map((stop, index) => (
						<DateStopForm
							locationPath={locationPath}
							index={index}
							isFirst={index === 0}
							isLast={index === stops.length - 1}
							isLengthMoreThanOne={stops.length > 1}
							remove={() => remove(index)}
							onMoveDown={() => move(index, index + 1)}
							onMoveUp={() => move(index, index - 1)}
							key={stop.key}
							fields={{
								content: `stops[${index}].content`,
								title: `stops[${index}].title`,
								location: {
									id: `stops[${index}].location.id`,
									name: `stops[${index}].location.name`,
								},
							}}
						/>
					))}
					<Button
						variant="black"
						size="md"
						icon={<FiPlus className={css({ color: "white" })} />}
						onClick={() =>
							push({ title: "", content: "", location: { id: "", name: "" } })
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
					<SubmitButton
						size="lg"
						variant="primary"
						label={
							page === "create" || page === "draft"
								? "Create new date"
								: "Edit date"
						}
					/>
				</div>
				{error && <p className={css({ textStyle: "error" })}>{error}</p>}
			</VStack>
		</ValidatedForm>
	)
}
