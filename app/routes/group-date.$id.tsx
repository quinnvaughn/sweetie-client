import { zodResolver } from "@hookform/resolvers/zod"
import { MetaFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { useEffect } from "react"
import { useRemixForm } from "remix-hook-form"
import { $params, $path } from "remix-routes"
import { ClientOnly } from "remix-utils/client-only"
import { match } from "ts-pattern"
import { z } from "zod"
import { DateLocationsMap } from "~/features/free-date"
import {
	FloatingGroupDateWaitlistGroup,
	FloatingSignupForWaitlist,
	GroupDateAddOns,
	GroupDateOrderedStop,
	GroupDateWaitlistGroup,
	IncludedWithPurchase,
	SignupForWaitlist,
} from "~/features/group-date"
import { TastemakerInfo } from "~/features/tastemaker"
import {
	Desktop,
	Image,
	Mobile,
	OpenShareModalLink,
	PageContainer,
} from "~/features/ui"
import { GetGroupDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { convertCentsToDollars, singularOrPlural } from "~/lib"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { divider, flex } from "~/styled-system/patterns"

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { id } = $params("/group-date/:id", params)
	const { data } = await gqlFetch(request, GetGroupDateDocument, {
		groupDateId: id,
	})
	if (!data?.groupDate) {
		throw new Response("Not Found", { status: 404 })
	}
	return json({ groupDate: data.groupDate })
}

const waitlistSchema = z.object({
	code: z.string(),
})

type Waitlist = z.infer<typeof waitlistSchema>

const waitlistResolver = zodResolver(waitlistSchema)

const searchParamsSchema = z.object({
	code: z.string().length(6).optional(),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.groupDate || data.groupDate.__typename === "Error") {
		return [{ title: "Not Found" }]
	}
	const groupDate = data.groupDate
	return [
		{ title: groupDate.title },
		{ name: "description", content: groupDate.description },
	]
}

export default function GroupDateRoute() {
	const { groupDate } = useLoaderData<typeof loader>()
	const { control, setValue } = useRemixForm<Waitlist>({
		mode: "onTouched",
		defaultValues: {
			code: "",
		},
		resolver: waitlistResolver,
	})

	const [searchParams] = useSearchParams()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// check if code is valid based on schema
		if (searchParams.has("code")) {
			// pass it into the schema
			const code = searchParams.get("code")
			const result = searchParamsSchema.safeParse({ code })
			// if it's valid, set the value
			if (result.success && result.data.code) {
				setValue("code", result.data.code)
			}
		}
	}, [])

	return (
		<PageContainer
			width={{ sm: "100%", md: 750, lg: 900, xl: 1100 }}
			padding={{
				base: "0px 20px 80px",
				md: "0px 20px 40px",
				lg: "0px 0px 40px",
			}}
		>
			{match(groupDate)
				.with({ __typename: "Error" }, () => (
					<p className={css({ textStyle: "paragraph" })}>Not Found</p>
				))
				.with({ __typename: "GroupDate" }, (groupDate) => (
					<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
						<Outlet />
						<Image
							src={groupDate.image}
							alt={groupDate.title}
							css={{
								width: "100%",
								aspectRatio: "16/9",
								objectFit: "cover",
								borderRadius: "8px",
								backgroundColor: "gray",
								maxHeight: "500px",
							}}
						/>
						<HStack
							gap={6}
							alignItems="flex-start"
							justifyContent={"flex-start"}
							width={"100%"}
						>
							<VStack
								gap={6}
								alignItems="flex-start"
								width={{ base: "100%", md: "66%" }}
							>
								<VStack gap={4} alignItems="flex-start" width={"100%"}>
									<h1
										className={css({
											textStyle: "h1",
											fontSize: { base: "32px", md: "40px" },
											fontWeight: "800",
										})}
									>
										{groupDate.title}
									</h1>
									<VStack
										gap={4}
										justifyContent="flex-start"
										alignItems="flex-start"
										width={"100%"}
									>
										<OpenShareModalLink
											to={$path("/group-date/:id/share", { id: groupDate.id })}
										/>
										<div
											className={divider({
												color: "gray",
												thickness: "1px",
												orientation: "horizontal",
												width: "100%",
											})}
										/>
									</VStack>
									<VStack gap={4} alignItems="flex-start" width={"100%"}>
										<h2
											className={css({ fontSize: "24px", fontWeight: "600" })}
										>
											Date TBD
										</h2>
										<p>
											If there's sufficient interest, we'll host this group date
											multiple times to accommodate everyone. If selected, we'll
											notify you with the date and payment details via email.
											Please note that increasing the number of people in your
											group improves your waitlist priority. Availability is
											first-come, first-served.
										</p>
										<VStack gap={2} alignItems="flex-start">
											<span
												className={css({
													fontWeight: "bold",
													fontSize: "18px",
												})}
											>
												Base price:
											</span>
											<span className={css({ textStyle: "paragraph" })}>
												{convertCentsToDollars(groupDate.minimumPrice)} -{" "}
												{convertCentsToDollars(groupDate.maximumPrice)}
											</span>
										</VStack>
										<VStack gap={2} alignItems="flex-start">
											<span
												className={css({
													fontWeight: "bold",
													fontSize: "18px",
												})}
											>
												Number of spots for couples:
											</span>
											<span className={css({ textStyle: "paragraph" })}>
												{groupDate.numSpots}
											</span>
										</VStack>
										<div
											className={divider({
												color: "gray",
												thickness: "1px",
												orientation: "horizontal",
												width: "100%",
											})}
										/>
									</VStack>
									<VStack gap={4} width="100%" alignItems={"flex-start"}>
										<TastemakerInfo tastemaker={groupDate.tastemaker} />
										<div
											className={divider({
												color: "gray",
												thickness: "1px",
												orientation: "horizontal",
												width: "100%",
											})}
										/>
									</VStack>
									<VStack gap={4} width={"100%"} alignItems={"flex-start"}>
										<div
											className={css({ display: "flex", gap: 1 })}
											id="location-cities"
										>
											<span className={css({ textStyle: "paragraph" })}>
												{singularOrPlural(
													groupDate.cities.length,
													"City: ",
													"Cities: ",
												)}
											</span>
											<div
												className={css({
													display: "flex",
													gap: 2,
													flexWrap: "wrap",
												})}
											>
												{groupDate.cities.map((city, i) => (
													<div
														key={city.id}
														className={css({ display: "flex", gap: 2 })}
													>
														<Link
															className={css({
																textDecoration: "underline",
																textStyle: "paragraph",
																fontWeight: "bold",
															})}
															to={$path("/search", {
																cities: [city.nameAndState],
															})}
														>
															<div
																className={css({
																	display: "flex",
																	gap: 1,
																	alignItems: "center",
																})}
															>
																<span>{city.nameAndState}</span>
															</div>
														</Link>
														{groupDate.cities.length > 1 &&
															i < groupDate.cities.length - 1 && <span>/</span>}
													</div>
												))}
											</div>
										</div>
										<div
											className={divider({
												color: "gray",
												thickness: "1px",
												orientation: "horizontal",
												width: "100%",
											})}
										/>
									</VStack>
									<em
										className={css({
											textStyle: "paragraph",
											fontStyle: "italic",
											wordBreak: "break-word",
											fontFamily: "spectral",
										})}
									>
										{groupDate.description}
									</em>
									<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
										<ClientOnly>
											{() => (
												<DateLocationsMap
													locations={groupDate.stops
														.filter(
															(value, index, self) =>
																index ===
																self.findIndex(
																	(t) => t.location.id === value.location.id,
																),
														)
														.map((stop) => stop.location)}
												/>
											)}
										</ClientOnly>
										{groupDate.stops.map((stop) => (
											<GroupDateOrderedStop key={stop.id} orderedStop={stop} />
										))}
									</VStack>
								</VStack>
								<div
									className={divider({
										color: "gray",
										thickness: "1px",
										orientation: "horizontal",
										width: "100%",
									})}
								/>
								<IncludedWithPurchase products={groupDate.products} />
								<div
									className={divider({
										color: "gray",
										thickness: "1px",
										orientation: "horizontal",
										width: "100%",
									})}
								/>
								<GroupDateAddOns addOns={groupDate.addOns} />
							</VStack>
							<div
								className={flex({
									width: `${100 / 3}%`,
									position: "sticky",
									top: "20px",
									display: { base: "none", md: "flex" },
								})}
							>
								<Desktop css={{ width: "100%" }}>
									{groupDate.userWaitlistGroup ? (
										<GroupDateWaitlistGroup
											groupDateId={groupDate.id}
											waitlistGroup={groupDate.userWaitlistGroup}
										/>
									) : (
										<SignupForWaitlist
											groupDateId={groupDate.id}
											control={control}
											fields={{ code: "code" }}
										/>
									)}
								</Desktop>
							</div>
						</HStack>
						<Mobile css={{ width: "100%" }}>
							{groupDate.userWaitlistGroup ? (
								<FloatingGroupDateWaitlistGroup
									groupDateId={groupDate.id}
									waitlistGroup={groupDate.userWaitlistGroup}
								/>
							) : (
								<FloatingSignupForWaitlist />
							)}
						</Mobile>
					</VStack>
				))
				.otherwise(() => null)}
		</PageContainer>
	)
}