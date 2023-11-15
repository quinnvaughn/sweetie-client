import { DataFunctionArgs } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { FiPlus } from "react-icons/fi/index.js"
import {
	ValidatedForm,
	useFieldArray,
	validationError,
} from "remix-validated-form"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { DateStopForm } from "~/features/free-date"
import {
	Button,
	CheckboxGroup,
	Input,
	PageContainer,
	RadioGroup,
	SubmitButton,
	TagsInput,
	Textarea,
} from "~/features/ui"
import { CreateFreeDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { omit } from "~/lib"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		// thumbnail: z.string().url("Thumbnail is required."),
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
		timesOfDay: zfd.repeatable(
			z.array(zfd.text()).min(1, "Must select at least one time of day."),
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
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)
	if (result.error) {
		return validationError(result.error)
	}
	const { data } = await gqlFetch(request, CreateFreeDateDocument, {
		input: {
			// TODO: add thumbnail
			...omit(result.data, "tagText", "tags"),
			tags: result.data.tags ?? [],
		},
	})
	return null
}

type Stop = {
	title: string
	content: string
	location: {
		id: string
		name: string
	}
}

export default function CreateFreeDateRoute() {
	const [stops, { push, remove, move }] = useFieldArray<Stop>("stops", {
		formId: "create-free-date-form",
	})

	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<ValidatedForm
				id="create-free-date-form"
				validator={validator}
				method="post"
				defaultValues={{
					stops: [{ title: "", content: "", location: { id: "", name: "" } }],
					tags: [],
					description: "",
					nsfw: "false",
					tagText: "",
					timesOfDay: ["morning", "afternoon", "evening"],
					title: "",
				}}
			>
				<VStack gap={4} alignItems="flex-start">
					<HStack
						gap={1}
						justifyContent="space-between"
						alignItems="flex-start"
					>
						<h1
							className={css({
								textStyle: "h1",
								fontSize: { base: "24px", md: "32px" },
							})}
						>
							Create date experience
						</h1>
						{/* <SaveDraftButton values={functions.watchDateExperienceValues()} /> */}
					</HStack>
					{/* <ImageUpload
						onDelete={image.onImageDelete}
						folder="date-experiences"
						value={[functions.watchDateExperienceValues("thumbnail")]}
						onSuccessfulUpload={(urls) => image.onSuccessImageUpload(urls[0])}
						accept={{
							"image/png": [],
							"image/jpeg": [".jpeg", ".jpg"],
						}}
						error={image.error}
						name="thumbnail"
						label="Thumbnail"
						required
					/> */}
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
							Is this date experience NSFW?
						</p>
						<RadioGroup
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
					<VStack gap={4} paddingBottom={40} alignItems="flex-start">
						<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
							We strongly encourage you to have at least three date stops. While
							not required, we believe that having more stops will make your
							date more fun and interesting.
						</p>
						{stops.map((stop, index) => (
							<DateStopForm
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
							onClick={() => push({ title: "", content: "", location: "" })}
						>
							Add another stop
						</Button>
					</VStack>
					<SubmitButton variant="primary" label="Create free date" />
				</VStack>
			</ValidatedForm>
		</PageContainer>
	)
}
