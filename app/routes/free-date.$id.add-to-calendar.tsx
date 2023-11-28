import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { DateTime } from "luxon"
import { $params, $path } from "remix-routes"
import { ClientOnly } from "remix-utils/client-only"
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
import {
	formatTime,
	getEnv,
	mapFieldErrorToValidationError,
	mixpanel,
} from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z
		.object({
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
			date: z.string(),
			time: z
				.string()
				.regex(
					/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/,
					"Must be a valid time format",
				),
			timeZone: z.string(),
		})
		.refine((data) => DateTime.fromISO(data.date).isValid, {
			path: ["date"],
			message: "Must be a valid date",
		})
		.refine(
			(data) => {
				console.log("first date", DateTime.fromISO(data.date).startOf("day"))
				console.log(
					"second date",
					DateTime.now().setZone(data.timeZone).startOf("day"),
				)
				return (
					DateTime.fromISO(data.date).startOf("day") >=
					DateTime.now().setZone(data.timeZone).startOf("day")
				)
			},
			{ path: ["date"], message: "Must be a date in the future" },
		),
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
	const formData = await request.formData()
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const result = await validator.validate(formData)

	console.log({ result })

	if (result.error) {
		console.log("validation error", result.error)
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

	const { data, errors } = await gqlFetch(
		request,
		CreateDateItineraryDocument,
		{
			input,
		},
	)

	console.log({ errors })

	return match(data?.createDateItinerary)
		.with({ __typename: "PlannedDate" }, (plannedDate) => {
			const date = DateTime.fromISO(plannedDate.plannedTime)
			const experience = plannedDate.experience
			mixpanel.track("Date Planned", {
				last_planned_date_at: new Date(),
				day_of_planned_date: date.weekdayLong,
				time_of_planned_date: date.toLocaleString(DateTime.TIME_SIMPLE),
				location_names: experience.stops.map((stop) => stop.location.name),
				location_cities: experience.cities.map((city) => city.name),
				title: experience.title,
				tastemaker_id: experience.tastemaker.user.id,
				tastemaker_name: experience.tastemaker.user.name,
				tastemaker_username: experience.tastemaker.user.username,
			})
			mixpanel.people.increment({
				planned_dates: 1,
				invited_guests: guest?.email ? 1 : 0,
			})
			return json({ success: true, errors: null, formData: result.data })
		})
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			console.log("field errors")
			const reduceToValidatorError = mapFieldErrorToValidationError(fieldErrors)
			return json(
				{ success: false, errors: reduceToValidatorError, formData: null },
				{ status: 400 },
			)
		})
		.otherwise(() => {
			console.log("weird error")
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
							<p
								className={css({ textStyle: "paragraph", textAlign: "center" })}
							>
								Adding the date to your calendar from here is free, makes it
								easy to remember, and saves you time.
							</p>
							<DatePicker name="date" label="Date" required />
							<TimePicker name="time" label="Start time" required />
							<p
								className={css({ textStyle: "paragraph", textAlign: "center" })}
							>
								You can also send this itinerary to your date so they can add it
								to their calendar too. This is completely optional.
							</p>
							<Input
								name="guest.name"
								label="Date's name (optional)"
								placeholder={"Your date's name"}
							/>
							<Input
								name="guest.email"
								label="Date's email (optional)"
								placeholder={"Your date's email"}
							/>
							<ClientOnly>
								{() => (
									<input
										type="hidden"
										name="timeZone"
										value={Intl.DateTimeFormat().resolvedOptions().timeZone}
									/>
								)}
							</ClientOnly>
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
