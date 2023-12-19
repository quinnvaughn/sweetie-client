import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react"
import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { Breadcrumbs, PageContainer } from "~/features/ui"
import {
	RemoveDefaultGuestDocument,
	ViewerHasDefaultGuestDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { button } from "~/styled-system/recipes"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, ViewerHasDefaultGuestDocument)

	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return json({ viewer: data.viewer })
}

export async function action({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, RemoveDefaultGuestDocument)

	return match(data?.removeDefaultGuest)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with({ __typename: "DefaultGuest" }, () => null)
		.otherwise(() => json({ error: "Something went wrong." }))
}

export default function DateSettingsRoute() {
	const { viewer } = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<Outlet />
			<VStack gap={8} alignItems="flex-start">
				<VStack gap={4} alignItems="flex-start">
					<Breadcrumbs>
						<Breadcrumbs.Link to={$path("/account-settings")} text="Account" />
						<Breadcrumbs.CurrentPage text="Date Settings" />
					</Breadcrumbs>
					<h1
						className={css({
							textStyle: "h1",
							fontSize: { base: "24px", md: "32px" },
						})}
					>
						Date settings
					</h1>
				</VStack>
				<VStack gap={4} alignItems="flex-start">
					<VStack gap={3} alignItems="flex-start" maxWidth={500}>
						<h3 className={css({ textStyle: "h3", fontSize: "22px" })}>
							Default guest
						</h3>
						<p className={css({ textStyle: "paragraph" })}>
							A default guest is a guest that will be automatically added to
							every date you create. This is useful if you are always going on
							dates with the same person. You can choose to not send them the
							date itinerary if you want to surprise them.
						</p>
						{viewer?.defaultGuest ? (
							<VStack alignItems={"flex-start"}>
								<VStack gap={1} alignItems={"flex-start"}>
									<p className={css({ textStyle: "paragraph" })}>
										<strong>Email</strong>
									</p>
									<p className={css({ textStyle: "paragraph" })}>
										{viewer.defaultGuest.email}
									</p>
								</VStack>
								<VStack gap={1} alignItems={"flex-start"}>
									<p className={css({ textStyle: "paragraph" })}>
										<strong>Name</strong>
									</p>
									<p className={css({ textStyle: "paragraph" })}>
										{viewer.defaultGuest.name}
									</p>
								</VStack>
								<div
									className={css({
										display: "flex",
										flexDirection: { base: "column", md: "row" },
										gap: 2,
									})}
								>
									<Link
										className={button({ variant: "tertiary", size: "md" })}
										to={$path("/account-settings/date-settings/add-guest")}
									>
										Update default guest
									</Link>
									<fetcher.Form method="post">
										<button
											type="submit"
											className={button({ variant: "black", size: "md" })}
										>
											Remove default guest
										</button>
									</fetcher.Form>
									{fetcher.data?.error && (
										<p className={css({ textStyle: "error" })}>
											{fetcher.data.error}
										</p>
									)}
								</div>
							</VStack>
						) : (
							<Link
								className={button({ variant: "tertiary", size: "md" })}
								to={$path("/account-settings/date-settings/add-guest")}
							>
								Add a default guest
							</Link>
						)}
					</VStack>
				</VStack>
			</VStack>
		</PageContainer>
	)
}
