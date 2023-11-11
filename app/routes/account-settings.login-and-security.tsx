import { DataFunctionArgs, json } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Breadcrumbs, Input, PageContainer } from "~/features/ui"
import { PersonalInfoEdit } from "~/features/user"
import { UpdatePasswordDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { isTypeofFieldError, mapFieldErrorToValidationError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z
		.object({
			currentPassword: z
				.string()
				.min(6, "Password must be at least 6 characters long"),
			newPassword: z
				.string()
				.min(6, "Password must be at least 6 characters long"),
		})
		.refine(
			(data) => {
				return data.currentPassword !== data.newPassword
			},
			{
				message: "New password must be different from current password",
				path: ["newPassword"],
			},
		),
)

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return validationError(result.error)
	}

	const { currentPassword, newPassword } = result.data

	const { data } = await gqlFetch(request, UpdatePasswordDocument, {
		input: {
			currentPassword,
			newPassword,
		},
	})

	return match(data?.updatePassword)
		.with({ __typename: "AuthError" }, () =>
			json({ error: "You aren't allowed to do that." }, { status: 401 }),
		)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message }, { status: 400 }),
		)
		.with({ __typename: "User" }, () => json({ error: null }, { status: 200 }))
		.otherwise(() =>
			json(
				{ error: "Something happened. Please try again later." },
				{ status: 500 },
			),
		)
}

export default function LoginAndSecurityRoute() {
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
						<Breadcrumbs.CurrentPage text="Login & Security" />
					</Breadcrumbs>
					<h1
						className={css({
							textStyle: "h1",
							fontSize: { base: "24px", md: "32px" },
						})}
					>
						Login and Security
					</h1>
				</VStack>
				<div
					className={css({
						width: { base: "100%", md: "500px" },
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
					})}
				>
					<VStack gap={2} alignItems="flex-start" width={"100%"}>
						<VStack gap={2} alignItems="flex-start">
							<h2
								className={css({
									textStyle: "paragraph",
									fontSize: "20px",
									fontWeight: "bold",
								})}
							>
								Login
							</h2>
							<p className={css({ textStyle: "paragraph", color: "grayText" })}>
								Update your password.
							</p>
						</VStack>
						<ValidatedForm
							fetcher={fetcher}
							validator={validator}
							method="post"
							className={css({ width: "100%" })}
						>
							<VStack gap={2} width={"100%"}>
								<PersonalInfoEdit
									close={!isTypeofFieldError(fetcher.data)}
									fieldName="password"
									label="Password"
									value={"********"}
									editDescription="Update your password."
									input={
										<VStack gap={2} width={"100%"}>
											<Input
												type="password"
												name="currentPassword"
												label="Current password"
												placeholder="Please enter your current password"
											/>
											<Input
												type="password"
												name="newPassword"
												label="New password"
												placeholder="Please enter your new password"
											/>
										</VStack>
									}
								/>
							</VStack>
							{!isTypeofFieldError(fetcher.data) && fetcher.data?.error && (
								<span className={css({ textStyle: "error" })}>
									{fetcher.data.error}
								</span>
							)}
						</ValidatedForm>
					</VStack>
				</div>
			</VStack>
		</PageContainer>
	)
}
