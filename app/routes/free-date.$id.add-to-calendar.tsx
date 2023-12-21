import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
	json,
} from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { DateTime } from "luxon"
import { useEffect } from "react"
import { $params, $path } from "remix-routes"
import { ClientOnly } from "remix-utils/client-only"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { zfd } from "zod-form-data"
import {
	AddGoogleCalendar,
	SendToDefaultGuest,
	SuccessfulEmail,
} from "~/features/free-date"
import {
	CheckboxAndInputs,
	DatePicker,
	Input,
	Modal,
	TimePicker,
} from "~/features/ui"
import {
	CreateDateItineraryDocument,
	CreateDateItineraryInput,
	GetFreeDateDocument,
	ViewerHasDefaultGuestDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useOpenedModal, useViewer } from "~/hooks"
import { formatTime, mapFieldErrorToValidationError, omit } from "~/lib"
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
					sendToDefaultGuest: zfd.checkbox({ trueValue: "true" }),
					add: zfd.checkbox({ trueValue: "true" }),
					email: z.string().email("Must be a valid email").or(z.literal("")),
					name: z
						.string()
						.min(1, "Must be at least 1 character")
						.or(z.literal("")),
				})
				.optional()
				.refine(
					(data) => {
						// if they have add checked, they must provide an email
						if (data?.add && data?.email.length === 0) {
							return false
						}
						return true
					},
					{
						path: ["email"],
						message: "Must provide an email if you add a guest",
					},
				)
				.refine(
					(data) => {
						if (
							data?.add &&
							data?.name &&
							data?.name.length > 0 &&
							data?.email.length === 0
						) {
							return false
						}
						return true
					},
					{
						path: ["email"],
						message: "Must provide an email if you provide a name",
					},
				),
			date: z.string(),
			time: z
				.string()
				.regex(
					/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/,
					"Must be a valid time (e.g. 7:00 PM)",
				),
			timeZone: z.string(),
		})
		.refine((data) => DateTime.fromISO(data.date).isValid, {
			path: ["date"],
			message: "Must be a valid date",
		}),
)

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetFreeDateDocument, { id })

	if (!data?.freeDate) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.freeDate.__typename === "FreeDate")) {
		throw new Response("Not Found", { status: 404 })
	}
	const { data: viewerData } = await gqlFetch(
		request,
		ViewerHasDefaultGuestDocument,
	)
	return json({
		freeDate: data.freeDate,
		defaultGuest: viewerData?.viewer?.defaultGuest,
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

	const { data: viewerData } = await gqlFetch(
		request,
		ViewerHasDefaultGuestDocument,
	)

	console.log({ timeZone })

	console.log(
		"date",
		DateTime.fromFormat(`${date} ${formattedTime}`, "yyyy-MM-dd hh:mm a")
			.setZone(timeZone)
			.toISO() as string,
	)

	const input: CreateDateItineraryInput = {
		date: DateTime.fromFormat(
			`${date} ${formattedTime}`,
			"yyyy-MM-dd hh:mm a",
		).toISO() as string,
		timeZone,
		guest:
			guest?.sendToDefaultGuest && viewerData?.viewer?.defaultGuest
				? omit(viewerData.viewer.defaultGuest, "__typename")
				: guest?.email && guest.email.length > 0
				? omit(guest, "add", "sendToDefaultGuest")
				: undefined,
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
	const { freeDate, defaultGuest } = useLoaderData<typeof loader>()
	const { isLoggedIn } = useViewer()
	const fetcher = useFetcher<typeof action>()
	useOpenedModal(
		isLoggedIn()
			? "create-date-itinerary"
			: "create-date-itinerary-not-logged-in",
	)

	useEffect(() => {
		if (fetcher.data?.success) {
			document.getElementById("modal-body")?.scrollTo(0, 0)
		}
	}, [fetcher.data])

	const authorizedCalendar = freeDate.viewerAuthorizedGoogleCalendar

	return (
		<ValidatedForm
			defaultValues={{
				date: new Date().toISOString().split("T")[0],
				time: undefined,
				guest: {
					add: false,
					name: defaultGuest?.name ?? "",
					email: defaultGuest?.email ?? "",
					sendToDefaultGuest: defaultGuest !== null,
				},
				user: {
					name: "",
					email: "",
				},
			}}
			validator={validator}
			method="post"
			fetcher={fetcher}
		>
			<Modal>
				<Modal.Header
					type="link"
					title={
						fetcher.data?.success
							? authorizedCalendar
								? "Added to your calendar!"
								: "Emailed!"
							: authorizedCalendar
							? "Add to my calendar"
							: "Email me the date itinerary"
					}
					to={$path("/free-date/:id", { id: freeDate.id })}
				/>
				<Modal.Body id="modal-body">
					{fetcher.data?.success ? (
						<SuccessfulEmail
							authorizedGoogleCalendar={authorizedCalendar}
							guestEmail={fetcher.data?.formData?.guest?.email}
							addedGuest={fetcher.data?.formData?.guest?.add}
							hasDefaultGuest={defaultGuest !== null}
							sendToDefaultGuest={
								fetcher.data?.formData?.guest?.sendToDefaultGuest ?? false
							}
							guestName={fetcher.data?.formData?.guest?.name}
							userEmail={fetcher.data?.formData?.user?.email}
						/>
					) : (
						<VStack gap={3} justifyContent="center">
							<p
								className={css({ textStyle: "paragraph", textAlign: "center" })}
							>
								{!authorizedCalendar
									? "Level up your dates! Connect Google Calendar for a seamless experience, or email it to yourself—your move!"
									: "Ready to roll! Your connected calendar means adding this date idea and future plans is just one click away."}
							</p>
							{!authorizedCalendar && <AddGoogleCalendar />}
							{!isLoggedIn() && (
								<>
									<Input name="user.name" label="Your name" required />
									<Input name="user.email" label="Your email" required />
								</>
							)}
							<DatePicker name="date" label="Date" required />
							<TimePicker name="time" label="Start time" required />
							{defaultGuest !== null && defaultGuest !== undefined ? (
								<SendToDefaultGuest
									guest={{
										email: {
											name: "guest.email",
											value: defaultGuest.email,
										},
										name: {
											name: "guest.name",
											value: defaultGuest.name ?? "",
										},
									}}
									name="guest.sendToDefaultGuest"
									label="Send to your default guest?"
								/>
							) : (
								<CheckboxAndInputs
									checkboxLabel="Send an email to your guest with the date itinerary?"
									checkboxName="guest.add"
									inputs={[
										{
											label: "Guest's email",
											name: "guest.email",
											placeholder: "Your guest's email",
											required: true,
											autoComplete: "off",
										},
										{
											label: "Guest's name",
											name: "guest.name",
											placeholder: "Your guest's name",
											autoComplete: "off",
										},
									]}
								/>
							)}
							<ClientOnly>
								{() => (
									<input
										type="hidden"
										name="timeZone"
										value={DateTime.local().zoneName as string}
									/>
								)}
							</ClientOnly>
						</VStack>
					)}
				</Modal.Body>
				{!fetcher.data?.success && (
					<Modal.Footer
						button={{
							text: authorizedCalendar ? "Add to calendar" : "Email me",
							disabled: fetcher.state === "submitting",
						}}
					/>
				)}
			</Modal>
		</ValidatedForm>
	)
}
