import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
	json,
} from "@remix-run/node"
import { Link, useActionData, useLoaderData } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { DateTime } from "luxon"
import { useEffect } from "react"
import { $params, $path } from "remix-routes"
import { ClientOnly } from "remix-utils/client-only"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { SuccessfulEmail } from "~/features/free-date"
import { DatePicker, Input, Modal, TimePicker } from "~/features/ui"
import {
	CreateDateItineraryDocument,
	CreateDateItineraryInput,
	GetFreeDateDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useOpenedModal, useViewer } from "~/hooks"
import { formatTime, getEnv, mapFieldErrorToValidationError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z
		.object({
			user: z
				.object({
					email: z.string().email("Must be a valid email"),
					name: z.string().min(1, "Must be at least 1 character"),
				})
				.optional(),
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
		}),
)

const env = getEnv()

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetFreeDateDocument, { id })

	if (!data?.freeDate) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.freeDate.__typename === "FreeDate")) {
		throw new Response("Not Found", { status: 404 })
	}
	const link = `${env.FRONTEND_URL}${$path("/free-date/:id", {
		id: data.freeDate.id,
	})}`
	return json({
		freeDate: data.freeDate,
		link,
	})
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData()
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const result = await validator.validate(formData)

	if (result.error) {
		return json(
			{ success: false, errors: validationError(result.error), formData: null },
			{ status: 400 },
		)
	}
	const { guest, date, time, timeZone, user } = result.data

	const formattedTime = formatTime(time)

	const input: CreateDateItineraryInput = {
		date: DateTime.fromFormat(`${date} ${formattedTime}`, "yyyy-MM-dd hh:mm a")
			.setZone(timeZone)
			.toISO() as string,
		guest: guest?.email && guest.email.length > 0 ? guest : undefined,
		freeDateId: id,
		user,
	}

	const { data } = await gqlFetch(request, CreateDateItineraryDocument, {
		input,
	})

	return match(data?.createDateItinerary)
		.with({ __typename: "PlannedDate" }, () =>
			json({ success: true, errors: null, formData: result.data }),
		)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) => {
			const reduceToValidatorError = mapFieldErrorToValidationError(fieldErrors)
			return json(
				{ success: false, errors: reduceToValidatorError, formData: null },
				{ status: 400 },
			)
		})
		.otherwise(() =>
			json({ success: false, errors: null, formData: null }, { status: 500 }),
		)
}

export const meta: MetaFunction<typeof loader> = () => {
	return [{ name: "robots", content: "noindex" }]
}

export default function AddToCalendarPage() {
	const { freeDate, link } = useLoaderData<typeof loader>()
	const { isLoggedIn } = useViewer()
	const actionData = useActionData<typeof action>()
	useOpenedModal(
		isLoggedIn()
			? "create-date-itinerary"
			: "create-date-itinerary-not-logged-in",
	)

	useEffect(() => {
		if (actionData?.success) {
			document.getElementById("modal-body")?.scrollTo(0, 0)
		}
	}, [actionData])

	return (
		<ValidatedForm validator={validator} method="post">
			<Modal>
				<Modal.Header
					type="link"
					title={"Add to calendar"}
					to={$path("/free-date/:id", { id: freeDate.id })}
				/>
				<Modal.Body id="modal-body">
					{actionData?.success ? (
						<SuccessfulEmail
							link={link}
							guestName={actionData.formData?.guest?.name}
							userEmail={actionData.formData?.user?.email}
						/>
					) : (
						<VStack gap={2} justifyContent="center">
							<p
								className={css({ textStyle: "paragraph", textAlign: "center" })}
							>
								Adding the date to your calendar from here is free, makes it
								easy to remember, and saves you time.
							</p>
							{!isLoggedIn() && (
								<>
									<Input name="user.name" label="Your name" required />
									<Input name="user.email" label="Your email" required />
								</>
							)}
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
								autoComplete="off"
							/>
							<Input
								name="guest.email"
								label="Date's email (optional)"
								placeholder={"Your date's email"}
								autoComplete="off"
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
	)
}
