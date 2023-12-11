import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import {
	ValidatedForm,
	setFormDefaults,
	validationError,
} from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Input, Modal, Textarea } from "~/features/ui"
import {
	GetViewerInfoDocument,
	UpdateUserProfileDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { mapFieldErrorToValidationError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const schema = z.object({
	link: z
		.string()
		.refine(
			(url) => {
				if (url === "" || url === undefined || url === null) {
					return true
				}
				const regex = new RegExp(
					"^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
				)
				return regex.test(url)
			},
			{ message: "Must be a valid URL" },
		)
		.optional()
		.or(z.literal("")),
	bio: z
		.string()
		.max(280, "Bio must be at most 280 characters long")
		.or(z.literal(""))
		.optional(),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long")
		.max(15, "Username must be at most 15 characters long")
		.regex(
			new RegExp("^[a-zA-Z0-9_]+$"),
			"Username must only contain letters, numbers, and underscores",
		)
		.optional(),
	name: z
		.string()
		.min(1, "Name must be at least 1 character long")
		.max(32, "Name must be at most 32 characters long")
		.optional(),
	email: z.string().email("Must be a valid email").optional(),
})

export const validator = withZod(schema)

type DefaultValues = z.infer<typeof schema>

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerInfoDocument)
	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return json(
		setFormDefaults<DefaultValues>("edit-personal-info", {
			name: data.viewer.name,
			email: data.viewer.email,
			username: data.viewer.username,
			bio: data.viewer.profile?.bio ?? "",
			link: data.viewer.profile?.link ?? "",
		}),
	)
}

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return validationError(result.error)
	}

	const { data } = await gqlFetch(request, UpdateUserProfileDocument, {
		input: result.data,
	})

	return match(data?.updateUserProfile)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "User" }, () =>
			redirect($path("/account-settings/personal-info")),
		)
		.otherwise(() => json({ error: "Unknown error" }))
}

export default function EditRoute() {
	const fetcher = useFetcher<typeof action>()
	return (
		<ValidatedForm
			fetcher={fetcher}
			id="edit-personal-info"
			validator={validator}
			method="post"
		>
			<Modal>
				<Modal.Header
					type="link"
					title="Edit profile"
					to={$path("/account-settings/personal-info")}
				/>
				<Modal.Body>
					<div className={css({ display: "flex", flexDirection: "column" })}>
						<div
							className={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								width: "100%",
							})}
						>
							<VStack gap={4} alignItems="flex-start" width={"100%"}>
								<Input name="name" label="Name" placeholder="Name" required />
								<Input
									name="email"
									label="Email"
									placeholder="Email"
									required
								/>
								<Input
									name="username"
									label="Username"
									placeholder="Username"
									required
								/>
								<Textarea name="bio" label="Bio" placeholder="Bio" />
								<Input name="link" label="Link" placeholder="Link" />
							</VStack>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer
					button={{
						disabled: fetcher.state === "loading",
						text: "Save",
					}}
				/>
			</Modal>
		</ValidatedForm>
	)
}
