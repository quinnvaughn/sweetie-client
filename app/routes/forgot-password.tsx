import { DataFunctionArgs, json } from "@remix-run/node"
import { Link, useActionData, useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Input, PageContainer, SubmitButton } from "~/features/ui"
import { RequestPasswordResetDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { isTypeofFieldError, mapFieldErrorToValidationError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

const validator = withZod(
	z.object({
		email: z.string().email("Must be a valid email address"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await validator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}
	const { data } = await gqlFetch(request, RequestPasswordResetDocument, {
		input: result.data,
	})

	return match(data?.requestPasswordReset)
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ success: false, error: message }),
		)
		.with({ __typename: "RequestPasswordResetResponse" }, () =>
			json({ success: true, error: null }),
		)
		.otherwise(() => json({ success: false, error: "Something went wrong" }))
}

export default function ForgotPasswordRoute() {
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			width={{ base: "100%", lg: "400px" }}
			padding={{ base: "20px", lg: "40px 0px" }}
		>
			<VStack gap={4} alignItems="flex-start" width={"100%"}>
				<h1
					className={css({
						textStyle: "h1",
						fontSize: { base: "24px", md: "32px" },
					})}
				>
					Forgot password
				</h1>
				<VStack gap={4} width={"100%"} alignItems="flex-start">
					{!isTypeofFieldError(fetcher.data) && fetcher.data?.success ? (
						<VStack gap={4} alignItems="flex-start" width={"100%"}>
							<p
								className={css({ textStyle: "paragraph", textAlign: "center" })}
							>
								Your successfully requested a password reset. Please check your
								email for further instructions. You may close this page now.
							</p>
						</VStack>
					) : (
						<ValidatedForm
							fetcher={fetcher}
							method="post"
							validator={validator}
							className={css({ width: "100%" })}
						>
							<VStack gap={4} alignItems="flex-start" width={"100%"}>
								<Input
									required
									name="email"
									label="Email"
									placeholder="Please enter your email"
								/>
								<VStack
									gap={3}
									alignItems="center"
									justifyContent="flex-start"
									width={"100%"}
								>
									<SubmitButton label="Send reset link" variant="secondary" />
									<Link
										className={css({
											textStyle: "paragraph",
											fontWeight: "bold",
											_hover: {
												textDecoration: "underline",
											},
										})}
										to={$path("/login")}
									>
										Login
									</Link>
								</VStack>
								{!isTypeofFieldError(fetcher.data) && fetcher.data?.error && (
									<p
										className={css({
											textStyle: "error",
										})}
									>
										{fetcher.data.error}
									</p>
								)}
							</VStack>
						</ValidatedForm>
					)}
				</VStack>
			</VStack>
		</PageContainer>
	)
}
