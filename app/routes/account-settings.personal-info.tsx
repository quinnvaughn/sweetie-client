import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { useFetcher, useLoaderData, useLocation } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import {
	ValidatedForm,
	ValidationErrorResponseData,
	setFormDefaults,
	validationError,
} from "remix-validated-form"
import { P, match } from "ts-pattern"
import { z } from "zod"
import { Breadcrumbs, Input, PageContainer, Textarea } from "~/features/ui"
import { AvatarUpload, PersonalInfoEdit } from "~/features/user"
import {
	GetViewerInfoDocument,
	UpdateUserProfileDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { isTypeofFieldError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const schema = z.object({
	avatar: z.string().optional(),
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
	fieldUpdated: z.enum(["name", "email", "username", "bio", "link", "avatar"]),
})

export const validator = withZod(schema)

type DefaultValues = z.infer<typeof schema>

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return validationError(result.error)
	}

	const { fieldUpdated, ...rest } = result.data

	const updater = async () => {
		return await gqlFetch(request, UpdateUserProfileDocument, {
			input: { ...rest },
		})
	}

	const success = await match(fieldUpdated)
		.with(P.any, () => updater())
		.exhaustive()

	return match(success.data?.updateUserProfile)
		.with({ __typename: "AuthError" }, () =>
			redirect($path("/login"), { status: 401 }),
		)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError({
				fieldErrors: fieldErrors.reduce(
					(acc, { field, message }) => ({
						acc,
						[field]: message,
					}),
					{},
				),
			}),
		)
		.with({ __typename: "User" }, () =>
			json({ success: true, errors: null, close: fieldUpdated }),
		)
		.otherwise(() => json({ success: false, close: null }))
}

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerInfoDocument)
	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return json({
		viewer: data.viewer,
		...setFormDefaults<DefaultValues>("edit-personal-info", {
			avatar: data.viewer.profile?.avatar ?? "",
			bio: data.viewer.profile?.bio ?? "No bio yet",
			email: data.viewer.email,
			fieldUpdated: undefined,
			link: data.viewer.profile?.link ?? "No link yet",
			name: data.viewer.name,
			username: data.viewer.username,
		}),
	})
}

export default function PersonalInfoRoute() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<VStack gap={8} alignItems="flex-start">
				<VStack gap={4} alignItems="flex-start">
					<Breadcrumbs>
						<Breadcrumbs.Link to={$path("/account-settings")} text="Account" />
						<Breadcrumbs.CurrentPage text="Personal Info" />
					</Breadcrumbs>
					<h1
						className={css({
							fontSize: { base: "24px", md: "32px" },
							textStyle: "h1",
						})}
					>
						Personal Info
					</h1>
				</VStack>
				<ValidatedForm
					id="edit-personal-info"
					fetcher={fetcher}
					validator={validator}
					method="post"
				>
					<div className={css({ display: "flex", flexDirection: "column" })}>
						<div
							className={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								width: { base: "100%", sm: "500px" },
							})}
						>
							<VStack gap={4} alignItems="flex-start" width={"100%"}>
								<AvatarUpload
									name="avatar"
									onImageUpload={(url) => {
										const formData = new FormData()
										formData.set("fieldUpdated", "avatar")
										formData.set("avatar", url)
										fetcher.submit(formData, {
											method: "post",
										})
									}}
								/>
								<PersonalInfoEdit
									close={
										!isTypeofFieldError(fetcher.data) &&
										fetcher.data?.close === "name"
									}
									fieldName="name"
									label="Legal Name"
									value={data.viewer.name}
									editDescription="Your legal name that might appear on a license or passport."
									input={
										<Input
											// defaultValue={data.viewer.name}
											label="Name"
											name="name"
											placeholder="Enter your legal name"
										/>
									}
								/>
							</VStack>
							<PersonalInfoEdit
								close={
									!isTypeofFieldError(fetcher.data) &&
									fetcher.data?.close === "email"
								}
								fieldName="email"
								label="Email"
								value={data.viewer.email}
								editDescription="Your email"
								input={
									<Input
										label="Email"
										name="email"
										placeholder="Enter your new email"
									/>
								}
							/>
							<PersonalInfoEdit
								close={
									!isTypeofFieldError(fetcher.data) &&
									fetcher.data?.close === "username"
								}
								fieldName="username"
								label="Username"
								value={data.viewer.username}
								editDescription="Set your username"
								input={
									<Input
										label="Username"
										name="username"
										placeholder="Enter your new username"
									/>
								}
							/>
							<PersonalInfoEdit
								close={
									!isTypeofFieldError(fetcher.data) &&
									fetcher.data?.close === "bio"
								}
								fieldName="bio"
								label="Bio"
								value={data.viewer.profile?.bio || "No bio yet"}
								editDescription="Add your bio. This is especially useful if you are a tastemaker as it lets people know who they're getting dates from."
								input={<Textarea label="Bio" name="bio" placeholder="Bio" />}
							/>
							<PersonalInfoEdit
								close={
									!isTypeofFieldError(fetcher.data) &&
									fetcher.data?.close === "link"
								}
								fieldName="link"
								label="Link"
								value={data.viewer.profile?.link || "No link yet"}
								editDescription="Add your link. This is useful if you want to promote anything when people check out your profile."
								input={
									<Input
										label="Link"
										name="link"
										placeholder="Enter your new link"
									/>
								}
							/>
						</div>
					</div>
				</ValidatedForm>
			</VStack>
		</PageContainer>
	)
}
