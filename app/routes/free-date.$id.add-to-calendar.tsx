import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { DateTime } from "luxon"
import { $params, $path } from "remix-routes"
import {
	ValidatedForm,
	ValidatorError,
	validationError,
} from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { AuthModal } from "~/features/auth"
import {
	CopyLinkShareButton,
	DatePicker,
	FacebookShareButton,
	Input,
	MessagesShareButton,
	Modal,
	TimePicker,
	TwitterShareButton,
	WhatsAppShareButton,
} from "~/features/ui"
import {
	CreateDateItineraryDocument,
	CreateDateItineraryInput,
	GetDateExperienceDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useOpenedModal, useViewer } from "~/hooks"
import { formatTime, getEnv } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		guest: z
			.object({
				email: z.string().email("Must be a valid email").or(z.literal("")),
				name: z
					.string()
					.min(1, "Must be at least 1 character")
					.or(z.literal("")),
			})
			.optional()
			.refine(
				(data) => {
					if (
						data?.email &&
						data?.email.length > 0 &&
						data?.name.length === 0
					) {
						return false
					}
					return true
				},
				{
					path: ["name"],
					message: "Must provide a name if you provide an email",
				},
			),
		date: z
			.string()
			.refine((date) => DateTime.fromISO(date).isValid, "Must be a valid date")
			.refine(
				(date) =>
					DateTime.fromISO(date).startOf("day") >=
					DateTime.now().startOf("day"),
				"Must be a future date",
			),
		time: z
			.string()
			.regex(
				/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/,
				"Must be a valid time format",
			),
		timeZone: z.string(),
	}),
)

const env = getEnv()

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetDateExperienceDocument, { id })

	if (!data?.dateExperience) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.dateExperience.__typename === "DateExperience")) {
		throw new Response("Not Found", { status: 404 })
	}
	const link = `${env.FRONTEND_URL}${$path("/free-date/:id", {
		id: data.dateExperience.id,
	})}`
	return json({
		dateExperience: data.dateExperience,
		link,
	})
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return json(
			{ success: false, errors: validationError(result.error), formData: null },
			{ status: 400 },
		)
	}
	const { guest, date, time, timeZone } = result.data

	const formattedTime = formatTime(time)

	const input: CreateDateItineraryInput = {
		date: DateTime.fromFormat(`${date} ${formattedTime}`, "yyyy-MM-dd hh:mm a")
			.setZone(timeZone)
			.toISO() as string,
		timeZone: timeZone,
		guest: guest?.email && guest.email.length > 0 ? guest : undefined,
		experienceId: id,
	}

	const { data } = await gqlFetch(request, CreateDateItineraryDocument, {
		input,
	})

	return match(data?.createDateItinerary)
		.with({ __typename: "PlannedDate" }, () => {
			return json({ success: true, errors: null, formData: result.data })
		})
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			const reduceToValidatorError = fieldErrors.reduce((acc, curr) => {
				acc.fieldErrors[curr.field] = curr.message
				return acc
			}, {} as ValidatorError)
			return json(
				{ success: false, errors: reduceToValidatorError, formData: null },
				{ status: 400 },
			)
		})
		.otherwise(() => {
			return json(
				{ success: false, errors: null, formData: null },
				{ status: 500 },
			)
		})
}

const campaign = "date itinerary success"

export default function AddToCalendarPage() {
	const { dateExperience, link } = useLoaderData<typeof loader>()
	const { isLoggedIn } = useViewer()
	const actionData = useActionData<typeof action>()
	useOpenedModal("create-date-itinerary")
	return isLoggedIn() ? (
		<ValidatedForm validator={validator} method="post">
			<Modal>
				<Modal.Header
					title={"Add to calendar"}
					to={$path("/free-date/:id", { id: dateExperience.id })}
				/>
				<Modal.Body>
					{actionData?.success ? (
						<VStack gap={4}>
							<p
								className={css({ textAlign: "center", textStyle: "paragraph" })}
							>
								We successfully emailed you
								{actionData?.formData?.guest?.name
									? ` and ${actionData?.formData.guest?.name.split(" ")[0]} `
									: ""}{" "}
								the itinerary! Check your email for more details.
							</p>
							<p
								className={css({
									fontWeight: "bold",
									textAlign: "center",
									textStyle: "paragraph",
								})}
							>
								Want to share this date idea with your friends?
							</p>
							<VStack gap={4}>
								<CopyLinkShareButton
									link={link}
									css={{ width: "250px" }}
									campaign={campaign}
								/>
								<FacebookShareButton
									link={link}
									css={{ width: "250px" }}
									campaign={campaign}
								/>
								<TwitterShareButton
									link={link}
									css={{ width: "250px" }}
									campaign={campaign}
								/>
								<MessagesShareButton
									link={link}
									css={{ width: "250px" }}
									campaign={campaign}
								/>
								<WhatsAppShareButton
									link={link}
									css={{ width: "250px" }}
									campaign={campaign}
								/>
							</VStack>
						</VStack>
					) : (
						<VStack gap={2} justifyContent="center">
							<DatePicker name="date" label="Date" required />
							<TimePicker name="time" label="Start time" required />
							<Input
								name="guest.name"
								label="Date's name"
								placeholder={"Your date's name"}
							/>
							<Input
								name="guest.email"
								label="Date's email"
								placeholder={"Your date's email"}
							/>
							<input
								type="hidden"
								name="timeZone"
								value={Intl.DateTimeFormat().resolvedOptions().timeZone}
							/>
						</VStack>
					)}
				</Modal.Body>
				{!actionData?.success && <Modal.Footer button={{ text: "Email me" }} />}
			</Modal>
		</ValidatedForm>
	) : (
		<AuthModal
			onCloseLink={$path("/free-date/:id", { id: dateExperience.id })}
			redirectTo={$path("/free-date/:id/add-to-calendar", {
				id: dateExperience.id,
			})}
		/>
	)
}
