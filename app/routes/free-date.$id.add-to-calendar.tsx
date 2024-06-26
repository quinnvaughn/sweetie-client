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
	RecommendedTimePicker,
	SendToDefaultGuest,
	SuccessfulEmail,
} from "~/features/free-date"
import { CheckboxAndInputs, DatePicker, Input, Modal } from "~/features/ui"
import {
	CreateDateItineraryDocument,
	CreateDateItineraryInput,
	DateStopOptionFragment,
	GetFreeDateDocument,
	OrderedDateStopFragment,
	ViewerHasDefaultGuestDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useTrack, useViewer } from "~/hooks"
import {
	formatTime,
	getDefaultSelectedOptions,
	getSelectedDateOptions,
	isTypeofFieldError,
	mapFieldErrorToValidationError,
	omit,
} from "~/lib"
import { freeDateStore, useStopsContext } from "~/stores"
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
			time: z.string(),
			timeZone: z.string(),
			selectedOptionIds: zfd.repeatableOfType(z.string()),
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
		return validationError(result.error)
	}
	const { guest, date, time, timeZone, user, selectedOptionIds } = result.data

	const formattedTime = formatTime(time)

	const { data: viewerData } = await gqlFetch(
		request,
		ViewerHasDefaultGuestDocument,
	)

	const input: CreateDateItineraryInput = {
		date: DateTime.fromFormat(`${date} ${formattedTime}`, "yyyy-MM-dd hh:mm a")
			.setZone(timeZone, { keepLocalTime: true })
			.toISO() as string,
		timeZone,
		// hate that it does this, need to fix it.
		selectedOptionIds: selectedOptionIds
			.toString()
			.split(",")
			.map((id) => id.trim()),
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: `Add ${data?.freeDate.title ?? ""} to your calendar` },
		{ name: "robots", content: "noindex" },
	]
}

export default function AddToCalendarPage() {
	const { freeDate, defaultGuest } = useLoaderData<typeof loader>()
	const { isLoggedIn } = useViewer()
	const fetcher = useFetcher<typeof action>()
	const track = useTrack()
	const { state } = useStopsContext()
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		track("User Opened Add to Calendar Modal", {
			title: freeDate.title,
			tastemaker_name: freeDate.tastemaker.user.name,
			logged_in: isLoggedIn(),
		})
	}, [])

	useEffect(() => {
		if (!isTypeofFieldError(fetcher.data) && fetcher.data?.success) {
			document.getElementById("modal-body")?.scrollTo(0, 0)
		}
	}, [fetcher.data])

	const authorizedCalendar = freeDate.viewerAuthorizedGoogleCalendar

	return (
		<ValidatedForm
			defaultValues={{
				date: new Date().toISOString().split("T")[0],
				time: freeDate.recommendedTime,
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
						!isTypeofFieldError(fetcher.data) && fetcher.data?.success
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
					{!isTypeofFieldError(fetcher.data) && fetcher.data?.success ? (
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
						<VStack gap={1} justifyContent="center">
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
									<Input name="user.name" label="Name" required />
									<Input name="user.email" label="Email" required />
								</>
							)}
							<DatePicker name="date" label="Date" required />
							<RecommendedTimePicker required label="Start time" name="time" />
							<input
								type="hidden"
								name="selectedOptionIds"
								value={
									state.orderedStops.size === 0
										? getSelectedDateOptions(
												getDefaultSelectedOptions(freeDate),
										  )
										: getSelectedDateOptions(state.orderedStops)
								}
							/>
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
				{!isTypeofFieldError(fetcher.data) && !fetcher.data?.success && (
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
