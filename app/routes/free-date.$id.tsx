import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node"
import { match } from "ts-pattern"
import { gqlFetch } from "~/graphql/graphql"
import { GetDateExperienceDocument } from "~/graphql/generated"
import { $params, $path } from "remix-routes"
import { useScrolledToBottom } from "~/hooks"
import {
	Link,
	Outlet,
	useFetcher,
	useLoaderData,
	useParams,
} from "@remix-run/react"
import { showShareScreen } from "~/cookies.server"
import {
	CopyLinkShareButton,
	Desktop,
	FacebookShareButton,
	Image,
	Mobile,
	OpenShareModalLink,
	PageContainer,
	Tags,
	TwitterShareButton,
} from "~/features/ui"
import { css } from "~/styled-system/css"
import { divider, flex, numLines } from "~/styled-system/patterns"
import { FiX } from "react-icons/fi/index.js"
import { HStack, VStack } from "~/styled-system/jsx"
import { IoIosCheckmarkCircleOutline } from "react-icons/io/index.js"
import {
	DateLocationsMap,
	EmailItineraryRightSide,
	NSFWTag,
	TimeOfTheDay,
} from "~/features/free-date"
import { FloatingAddToCalendar } from "~/features/date-itinerary"
import { TastemakerInfo } from "~/features/tastemaker"
import { DateStop } from "~/features/date-stop"
import { ClientOnly } from "remix-utils/client-only"
import { mixpanel, singularOrPlural } from "~/lib"
import { UserAvatar } from "~/features/user"

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id", params)
	const { data } = await gqlFetch(request, GetDateExperienceDocument, { id })

	if (!data?.dateExperience) {
		throw new Response("Not Found", { status: 404 })
	}
	const cookieHeader = request.headers.get("Cookie")
	const cookie = await showShareScreen.parse(cookieHeader)
	return json({
		dateExperience: data.dateExperience,
		showShareScreen: cookie ? (cookie.showShareScreen as boolean) : false,
	})
}

export async function action({ request, params }: DataFunctionArgs) {
	const { id } = $params("/free-date/:id", params)
	const cookieHeader = request.headers.get("Cookie")
	const cookie = await showShareScreen.parse(cookieHeader)
	cookie.showShareScreen = false

	return redirect($path("/free-date/:id", { id }), {
		headers: {
			"Set-Cookie": await showShareScreen.serialize(cookie),
		},
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.dateExperience) {
		return [{ title: "Not Found" }, { status: "404" }]
	} else {
		return match(data.dateExperience)
			.with(
				{ __typename: "DateExperience" },
				({
					title,
					description,
					thumbnail,
					tags,
					createdAt,
					updatedAt,
					tastemaker,
					cities,
					id,
				}) => [
					{ title: `${title} by ${tastemaker.user.name} - Sweetie date idea` },
					{
						name: "keywords",
						content: [
							...tags.map((t) => t.name),
							"dating",
							"date ideas",
							cities.map((c) => c.name),
						],
					},
					{ name: "description", content: description.slice(0, 200) },
					{
						name: "og:title",
						content: `${title} by ${tastemaker.user.name} - Sweetie date idea`,
					},
					{ name: "og:description", content: description.slice(0, 200) },
					{ name: "og:image", content: thumbnail },
					{
						name: "og:url",
						content: `https://trysweetie.com/experience/${id}`,
					},
					{
						name: "og:site_name",
						content: "Sweetie",
					},
					{
						name: "og:type",
						content: "article",
					},
					{
						name: "article:published_time",
						content: createdAt,
					},
					{
						name: "article:modified_time",
						content: updatedAt,
					},
					{
						name: "article:author",
						content: `https://trysweetie.com/user/${tastemaker.user.id}`,
					},
					{
						name: "article:tag",
						content: [
							...tags.map((t) => t.name),
							"dating",
							"date ideas",
							cities.map((c) => c.name),
						],
					},
					{
						name: "article:section",
						content: "Dating",
					},
					{
						name: "twitter:card",
						content: "summary_large_image",
					},
					{
						name: "twitter:site",
						content: "@sweetie_dates",
					},
					// TODO: twitter:creator
					// we don't currently know the twitter handle of the tastemaker
				],
			)
			.otherwise(() => [{ title: "Not Found" }, { status: "404" }])
	}
}

const campaign = "tastemaker share date"

export default function FreeDateIdeaRoute() {
	const { dateExperience, showShareScreen } = useLoaderData<typeof loader>()
	const params = useParams()
	const { id } = $params("/free-date/:id", params)
	const fetcher = useFetcher()
	useScrolledToBottom(() => {
		if (!showShareScreen) {
			mixpanel.track("User Scrolled To Bottom", {
				of: "Free Date Page",
				free_date_id: id,
			})
		}
	})

	return showShareScreen ? (
		<div className={css({ width: "100%" })}>
			<div
				className={flex({
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					borderBottom: "1px solid",
					borderBottomColor: "gray",
					padding: {
						base: "20px 8px",
						md: "8px",
					},
				})}
			>
				<fetcher.Form method="post">
					<button
						type="submit"
						className={css({
							background: "none",
							border: "none",
							cursor: "pointer",
							_hover: {
								opacity: 0.7,
							},
						})}
					>
						<FiX size={"24px"} className={css({ color: "black" })} />
					</button>
				</fetcher.Form>
				<p
					className={css({
						fontWeight: "bold",
						fontSize: { base: "18px", md: "24px" },
					})}
				>
					Share your date:
				</p>
				<div aria-hidden={true} className={css({ opacity: "0" })}>
					Back
				</div>
			</div>
			<div
				className={css({
					display: "flex",
					justifyContent: "center",
					width: "100%",
				})}
			>
				<VStack
					alignItems="flex-start"
					justifyContent={"flex-start"}
					gap={4}
					paddingY={"20px"}
					width={"300px"}
				>
					{match(dateExperience)
						.with({ __typename: "DateExperience" }, (date) => (
							<VStack gap="4" width={"100%"} alignItems="flex-start">
								<Image
									src={date.thumbnail}
									alt={`${date.title} thumbnail`}
									css={{
										aspectRatio: "20/19",
										objectFit: "cover",
										borderRadius: "8px",
										backgroundColor: "gray",
									}}
								/>
								<VStack gap="2" alignItems={"flex-start"} width={"100%"}>
									<p className={css({ lineHeight: 1, fontWeight: "600" })}>
										{date.title}
									</p>
									<HStack gap={1} alignItems="center">
										<UserAvatar
											size={"sm"}
											user={{
												name: date.tastemaker.user.name,
												avatar: date.tastemaker.user.profile?.avatar,
											}}
										/>
										<p className={css({ color: "grayText" })}>
											{date.tastemaker.user.name}
										</p>
									</HStack>
								</VStack>
							</VStack>
						))
						.otherwise(() => null)}
					<div
						className={css({
							display: "flex",
							width: "100%",
							justifyContent: "center",
						})}
					>
						<IoIosCheckmarkCircleOutline
							className={css({ color: "primary" })}
							size={30}
						/>
					</div>
					<p
						className={css({
							textStyle: "paragraph",
							fontWeight: "bold",
							textAlign: "center",
						})}
					>
						You successfully created your date! Make sure to share it.
					</p>
					<CopyLinkShareButton campaign={campaign} css={{ width: "100%" }} />
					<FacebookShareButton campaign={campaign} css={{ width: "100%" }} />
					<TwitterShareButton campaign={campaign} css={{ width: "100%" }} />
				</VStack>
			</div>
		</div>
	) : (
		<PageContainer
			width={{ sm: "100%", md: 750, lg: 900, xl: 1100 }}
			padding={{
				base: "0px 20px 80px",
				md: "0px 20px 40px",
				lg: "0px 0px 40px",
			}}
		>
			<Outlet />
			{match(dateExperience)
				.with({ __typename: "Error" }, () => (
					<p className={css({ textStyle: "paragraph" })}>Not Found</p>
				))
				.with({ __typename: "DateExperience" }, (experience) => (
					<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
						<Image
							src={experience.thumbnail}
							alt={experience.title}
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
								gap={4}
								alignItems="flex-start"
								width={{ base: "100%", md: "66%" }}
							>
								<VStack gap={experience.nsfw ? 1 : 0}>
									<h1 className={css({ textStyle: "h1", fontSize: 32 })}>
										{experience.title}
									</h1>
									{experience.nsfw && <NSFWTag size="lg" />}
								</VStack>
								<VStack
									gap={4}
									justifyContent="flex-start"
									alignItems="flex-start"
									width={"100%"}
								>
									<OpenShareModalLink
										to={$path("/free-date/:id/share", { id: experience.id })}
									/>
									{experience.tags.length > 0 && (
										<Tags tags={experience.tags} />
									)}
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
									<TastemakerInfo tastemaker={experience.tastemaker} />
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
										className={css({
											display: "flex",
											gap: 1,
											flexWrap: "wrap",
										})}
									>
										<span className={css({ textStyle: "paragraph" })}>
											{singularOrPlural(
												experience.cities.length,
												"City: ",
												"Cities: ",
											)}
										</span>
										{experience.cities.map((city) => (
											<Link
												key={city.id}
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
										))}
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
									{experience.description}
								</em>
								<VStack gap={4} alignItems="flex-start">
									<h3
										className={css({
											fontSize: 20,
											textStyle: "paragraph",
											fontWeight: "bold",
										})}
									>
										{`Recommended time${
											experience.timesOfDay.length > 1 ? "s" : ""
										} of the day`}
									</h3>
									<HStack gap={2} justifyContent="flex-start">
										{experience.timesOfDay.map((time) => (
											<TimeOfTheDay name={time.name} key={time.id} />
										))}
									</HStack>
								</VStack>
								<VStack gap={4} alignItems={"flex-start"}>
									<ClientOnly>
										{() => <DateLocationsMap stops={experience.stops} />}
									</ClientOnly>
									{experience.stops.map((stop) => (
										<DateStop stop={stop} key={stop.id} />
									))}
								</VStack>
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
									<EmailItineraryRightSide />
								</Desktop>
							</div>
						</HStack>
						<Mobile>
							<FloatingAddToCalendar />
						</Mobile>
					</VStack>
				))
				.otherwise(() => null)}
		</PageContainer>
	)
}
