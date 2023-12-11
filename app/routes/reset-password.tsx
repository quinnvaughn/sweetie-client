import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { Link, useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { ValidatedForm, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import { z } from "zod"
import { Button, Input, PageContainer } from "~/features/ui"
import { ResetPasswordDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { isTypeofFieldError } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

const validator = withZod(
	z.object({
		password: z.string().min(6, "Password must be at least 6 characters long"),
	}),
)

export async function action({ request }: DataFunctionArgs) {
	const result = await validator.validate(await request.formData())
	if (result.error) {
		return validationError(result.error)
	}
	const token = new URL(request.url).searchParams.get("token")
	const { data } = await gqlFetch(request, ResetPasswordDocument, {
		input: {
			password: result.data.password,
			token: token ?? "",
		},
	})

	return match(data?.resetPassword)
		.with({ __typename: "Error" }, ({ message }) =>
			json({ error: message, success: false }),
		)
		.with({ __typename: "User" }, () => json({ success: true, error: null }))
		.otherwise(() => json({ error: "Something went wrong", success: false }))
}

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	// if there is no token, redirect to home
	if (!url.searchParams.get("token")) {
		return redirect("/")
	}
	return null
}

export default function ResetPasswordRoute() {
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			width={{ base: "100%", lg: "400px" }}
			padding={{ base: "20px", lg: "40px 0px" }}
		>
			<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
				<h1
					className={css({
						textStyle: "h1",
						fontSize: { base: "24px", md: "32px" },
					})}
				>
					Reset password
				</h1>
				{!isTypeofFieldError(fetcher.data) && fetcher.data?.success ? (
					<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
						<p className={css({ textStyle: "paragraph" })}>
							Your password has been successfully reset. You may go home now.
						</p>
						<Link
							className={button({ variant: "tertiary" })}
							to={$path("/")}
							replace
						>
							Home
						</Link>
					</VStack>
				) : (
					<ValidatedForm
						fetcher={fetcher}
						validator={validator}
						method="post"
						className={css({ width: "100%" })}
					>
						<VStack gap={4} width={"100%"} alignItems={"flex-start"}>
							<Input
								required
								type="password"
								name="password"
								label="Password"
								placeholder="Please enter your new password"
							/>
							<Button type="submit" disabled={fetcher.state === "submitting"}>
								Reset password
							</Button>
						</VStack>
					</ValidatedForm>
				)}
				{!isTypeofFieldError(fetcher.data) && fetcher.data?.error && (
					<p className={css({ textStyle: "error" })}>{fetcher.data?.error}</p>
				)}
			</VStack>
		</PageContainer>
	)
}
