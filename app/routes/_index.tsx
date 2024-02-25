import { DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { LoginBenefitsSection } from "~/features/auth"
import { UpcomingEventList } from "~/features/event"
import { CategorizedDateLists } from "~/features/free-date"
import { SearchBar } from "~/features/search"
import { SpecialOffer } from "~/features/special-offer"
import { PageContainer } from "~/features/ui/page-container"
import {
	CategorizedDateListsDocument,
	GetEventsDocument,
	GetSpecialOfferDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data, response } = await gqlFetch(
		request,
		CategorizedDateListsDocument,
	)
	const { data: specialOfferData } = await gqlFetch(
		request,
		GetSpecialOfferDocument,
	)
	const { data: eventData } = await gqlFetch(request, GetEventsDocument)
	const newData = {
		...data,
		specialOffer: specialOfferData,
		events: eventData,
	}
	return json(newData, {
		headers: { "Set-Cookie": response?.headers.get("Set-Cookie") ?? "" },
	})
}

export default function HomeRoute() {
	const data = useLoaderData<typeof loader>()
	const ref = useRef<HTMLInputElement>(null)
	const { isLoggedIn } = useViewer()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0" }}
		>
			<VStack gap={8}>
				<p className={css({ textStyle: "paragraph", fontSize: "20px" })}>
					Your personal date concierge in{" "}
					<span className={css({ fontWeight: "bold", color: "secondary" })}>
						Los Angeles
					</span>
				</p>
				<SearchBar ref={ref} />
				{data.specialOffer?.getSpecialOffer && (
					<SpecialOffer specialOffer={data.specialOffer.getSpecialOffer} />
				)}
				{!isLoggedIn() && <LoginBenefitsSection />}
				<VStack gap={6} width={"100%"}>
					{data.events?.events.length && data.events.events.length > 0 ? (
						<UpcomingEventList eventList={data.events.events} />
					) : null}
					<CategorizedDateLists
						categorizedDateLists={data.categorizedDateLists ?? []}
					/>
					<p>
						Want to find more dates? Try{" "}
						<button
							className={css({
								textStyle: "paragraph",
								color: "primary",
								backgroundColor: "transparent",
								border: "none",
								cursor: "pointer",
								"&:hover": {
									textDecoration: "underline",
								},
							})}
							type="button"
							onClick={() => ref?.current?.focus()}
						>
							searching
						</button>
					</p>
				</VStack>
			</VStack>
		</PageContainer>
	)
}
