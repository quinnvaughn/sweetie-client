import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import {
	Link,
	Outlet,
	ShouldRevalidateFunction,
	useLoaderData,
} from "@remix-run/react"
import { DateTime } from "luxon"
import { $params, $path } from "remix-routes"
import { ClientOnly } from "remix-utils/client-only"
import { match } from "ts-pattern"
import { showShareScreen } from "~/cookies.server"
import { LoginBenefitsSection } from "~/features/auth"
import { FloatingAddToCalendar } from "~/features/date-itinerary"
import { DateStop } from "~/features/date-stop"
import {
	DateLocationsMap,
	EmailItineraryRightSide,
	FavoriteButton,
	FreeDateList,
	GetHelpFindingADate,
	NSFWTag,
	OnboardingTutorial,
	PayForMyDate,
} from "~/features/free-date"
import { ShareDateScreen } from "~/features/free-date/share-date-screen/share-date-screen"
import { TastemakerInfo } from "~/features/tastemaker"
import {
	Desktop,
	Image,
	Mobile,
	OpenShareModalLink,
	PageContainer,
	Tags,
} from "~/features/ui"
import { GetFreeDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useScrolledToBottom, useTrack, useViewer } from "~/hooks"
import { singularOrPlural } from "~/lib"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { divider, flex } from "~/styled-system/patterns"

export const shouldRevalidate: ShouldRevalidateFunction = ({
	formAction,
	currentUrl,
	defaultShouldRevalidate,
}) => {
	if (
		formAction === $path("/api/track") ||
		formAction === $path("/api/help-finding-a-date")
	) {
		return false
	}
	if (
		currentUrl.pathname.includes("share") ||
		currentUrl.pathname.includes("add-to-calendar")
	) {
		return false
	}
	if (formAction === $path("/login") || formAction === $path("/register")) {
		return true
	}
	return defaultShouldRevalidate
}

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id", params)
	const { data } = await gqlFetch(request, GetFreeDateDocument, { id })

	if (!data?.freeDate) {
		throw new Response("Not Found", { status: 404 })
	}
	const cookieHeader = request.headers.get("Cookie")
	const cookie = await showShareScreen.parse(cookieHeader)

	return json({
		freeDate: data.freeDate,
		showShareScreen: cookie ? (cookie.showShareScreen as boolean) : false,
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.freeDate) {
		return [{ title: "Not Found" }, { status: "404" }]
	} else {
		return match(data.freeDate)
			.with(
				{ __typename: "FreeDate" },
				({
					title,
					description,
					thumbnail,
					tags,
					createdAt,
					updatedAt,
					tastemaker,
					cities,
					stops,
					id,
				}) => [
					{
						title: `${title.trim()} by ${
							tastemaker.user.name
						} - Sweetie date idea`,
					},
					{
						name: "keywords",
						content: [
							...tags.map((t) => t.name),
							"dating",
							"date ideas",
							"free date ideas",
							"free date idea",
							"free date",
							"free dates",
							"dating ideas",
							"date night ideas",
							"date night idea",
							cities.map((c) => `${c.name} date idea`),
							cities.map((c) => `${c.name} date`),
							cities.map((c) => `date idea ${c.name}`),
							stops.map((s) => `${s.location.name} date idea`),
							stops.map((s) => `${s.location.name} date`),
							stops.map((s) => `${s.location.name} date night idea`),
							stops.map((s) => `${s.location.name} date night`),
							stops.map(
								(s) => `${s.location.name} in ${s.location.address.city.name}`,
							),
							stops.map(
								(s) => `${s.location.name} ${s.location.address.city.name}`,
							),
						],
					},
					{ name: "description", content: description },
					{ name: "robots", content: "index, follow" },
					{
						property: "og:title",
						content: `${title.trim()} by ${
							tastemaker.user.name
						} - Sweetie date idea`,
					},
					{ property: "og:description", content: description },
					{ property: "og:image", content: thumbnail },
					{
						property: "og:url",
						content: `https://trysweetie.com/free-date/${id}`,
					},
					{
						property: "og:site_name",
						content: "Sweetie",
					},
					{
						property: "og:type",
						content: "article",
					},
					{
						property: "article:published_time",
						content: createdAt,
					},
					{
						property: "article:modified_time",
						content: updatedAt,
					},
					{
						property: "article:tag",
						content: [
							...tags.map((t) => `${t.name} date idea`),
							"dating",
							"date ideas",
							cities.map((c) => `${c.name} date idea`),
						],
					},
					{
						property: "article:section",
						content: "Dating",
					},
					{
						property: "article:published_time",
						content: DateTime.fromISO(createdAt).toFormat("yyyy-MM-dd"),
					},
					{
						name: "publish_date",
						property: "og:publish_date",
						content: DateTime.fromISO(createdAt).toFormat(
							"yyyy-MM-ddTHH:mm:ssZ",
						),
					},
					{ property: "article:author", content: tastemaker.user.name },
					{
						property: "twitter:card",
						content: "summary_large_image",
					},
					{
						property: "twitter:site",
						content: "@sweetie_dates",
					},
					{
						property: "twitter:title",
						content: `${title.trim()} by ${
							tastemaker.user.name
						} - Sweetie date idea`,
					},
					{
						property: "twitter:url",
						content: `https://trysweetie.com/free-date/${id}`,
					},
					{
						property: "twitter:description",
						content: description,
					},
					{
						property: "twitter:image",
						content: thumbnail,
					},
					{
						name: "author",
						property: "og:author",
						content: tastemaker.user.name,
					},
					// TODO: twitter:creator
					// we don't currently know the twitter handle of the tastemaker
				],
			)
			.otherwise(() => [{ title: "Not Found" }, { status: "404" }])
	}
}

export default function FreeDateIdeaRoute() {
	const { freeDate, showShareScreen } = useLoaderData<typeof loader>()
	const track = useTrack()
	const { isLoggedIn } = useViewer()
	useScrolledToBottom(() => {
		if (freeDate.__typename === "FreeDate" && !freeDate.isUserTastemaker) {
			track("User Scrolled To Bottom", {
				of: "Free Date Page",
				title: freeDate.title,
				tastemaker_name: freeDate.tastemaker.user.name,
			})
		}
	})

	return showShareScreen && freeDate.__typename === "FreeDate" ? (
		<ShareDateScreen freeDate={freeDate} />
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
			<OnboardingTutorial />
			{match(freeDate)
				.with({ __typename: "Error" }, () => (
					<p className={css({ textStyle: "paragraph" })}>Not Found</p>
				))
				.with({ __typename: "FreeDate" }, (freeDate) => (
					<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
						<Image
							src={freeDate.thumbnail}
							alt={freeDate.title}
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
								<VStack
									gap={freeDate.nsfw ? 1 : 0}
									width={"100%"}
									alignItems={"flex-start"}
								>
									<h1 className={css({ textStyle: "h1", fontSize: 32 })}>
										{freeDate.title}
									</h1>
									{freeDate.nsfw && <NSFWTag size="lg" />}
								</VStack>
								<VStack
									gap={4}
									justifyContent="flex-start"
									alignItems="flex-start"
									width={"100%"}
								>
									<div className={flex({ gap: 2 })} id="share-and-save">
										<OpenShareModalLink
											to={$path("/free-date/:id/share", { id: freeDate.id })}
										/>
										<FavoriteButton
											favorited={freeDate.viewerFavorited}
											id={freeDate.id}
											title={freeDate.title}
										/>
									</div>
									<PayForMyDate />
									{freeDate.tags.length > 0 && <Tags tags={freeDate.tags} />}
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
									<TastemakerInfo tastemaker={freeDate.tastemaker} />
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
												freeDate.cities.length,
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
											{freeDate.cities.map((city, i) => (
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
													{freeDate.cities.length > 1 &&
														i < freeDate.cities.length - 1 && <span>/</span>}
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
									{freeDate.description}
								</em>
								{freeDate.prep.length > 0 && (
									<VStack gap={4} width={"100%"} alignItems={"flex-start"}>
										<div
											className={divider({
												color: "gray",
												thickness: "1px",
												orientation: "horizontal",
												width: "100%",
											})}
										/>
										<h3 className={css({ textStyle: "h3" })}>Before you go</h3>
										<ul className={css({ listStyle: "inside" })}>
											{freeDate.prep.map((p, i) => (
												<li key={`${p}${i}`}>{p}</li>
											))}
										</ul>
									</VStack>
								)}
								<VStack gap={4} alignItems={"flex-start"}>
									<ClientOnly>
										{() => <DateLocationsMap stops={freeDate.stops} />}
									</ClientOnly>
									{!isLoggedIn() && (
										<LoginBenefitsSection buttonSize={{ desktop: "sm" }} />
									)}
									{freeDate.stops.map((stop, i) => (
										<DateStop
											stop={stop}
											key={stop.id}
											id={i === 0 ? "first-stop" : ""}
										/>
									))}
									P
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
						<div
							className={divider({
								color: "gray",
								thickness: "1px",
								orientation: "horizontal",
								width: "100%",
							})}
						/>
						<GetHelpFindingADate />
						<div
							className={divider({
								color: "gray",
								thickness: "1px",
								orientation: "horizontal",
								width: "100%",
							})}
						/>
						<h3 className={css({ textStyle: "h1", fontSize: "20px" })}>
							Explore more
						</h3>
						<FreeDateList freeDates={freeDate.exploreMore} />
					</VStack>
				))
				.otherwise(() => null)}
		</PageContainer>
	)
}
