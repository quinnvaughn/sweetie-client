import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { Form, useFetcher, useLoaderData } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { DateTime } from "luxon"
import { $params, $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import {
	CopyLinkShareButton,
	FacebookShareButton,
	Input,
	MessagesShareButton,
	Modal,
	TwitterShareButton,
	WhatsAppShareButton,
} from "~/features/ui"
import { GetDateExperienceDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useOpenedModal, useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
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
		guest: z
			.object({
				name: z
					.string()
					.min(1, "Must be at least 1 character")
					.or(z.literal("")),
				email: z.string().email("Must be a valid email").or(z.literal("")),
			})
			.optional(),
	}),
)

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetDateExperienceDocument, { id })

	if (!data?.dateExperience) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.dateExperience.__typename === "DateExperience")) {
		throw new Response("Not Found", { status: 404 })
	}
	return json({
		dateExperience: data.dateExperience,
	})
}

export async function action({ request }: ActionFunctionArgs) {
	const result = await validator.validate(await request.formData())
	console.log("result", result)
	return json({ success: true })
}

const campaign = "date itinerary success"

export default function AddToCalendarPage() {
	const { dateExperience } = useLoaderData<typeof loader>()
	const { isLoggedIn } = useViewer()
	const fetcher = useFetcher<typeof action>()
	useOpenedModal("create-date-itinerary")
	return (
		<ValidatedForm validator={validator} method="post">
			<Modal>
				<Modal.Header
					title={"Add to calendar"}
					to={$path("/free-date/:id", { id: dateExperience.id })}
				/>
				<Modal.Body>
					{fetcher.data?.success ? (
						<VStack gap={4}>
							<p
								className={css({ textAlign: "center", textStyle: "paragraph" })}
							>
								We successfully emailed you
								{fetcher.formData?.get("guestName")
									? ` and ${
											fetcher.formData
												?.get("guestName")
												?.toString()
												.split(" ")[0]
									  } `
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
							<VStack gap={4} width={"300px"}>
								<CopyLinkShareButton campaign={campaign} />
								<FacebookShareButton campaign={campaign} />
								<TwitterShareButton campaign={campaign} />
								<MessagesShareButton campaign={campaign} />
								<WhatsAppShareButton campaign={campaign} />
							</VStack>
						</VStack>
					) : (
						<VStack gap={2} justifyContent="center">
							{/* <DatePicker onSelectDate={selectDate} label="Date" required />
					<TimePicker label="Start time" required onTimeSelected={selectTime} /> */}
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
						</VStack>
					)}
				</Modal.Body>
				<Modal.Footer button={{ text: "Email me" }} />
			</Modal>
		</ValidatedForm>
	)
}
