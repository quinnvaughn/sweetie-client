import { DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { LoginBenefitsSection } from "~/features/auth"
import { CategorizedDateLists } from "~/features/free-date"
import { SearchBar } from "~/features/search"
import { SpecialOffer } from "~/features/special-offer"
import { Image } from "~/features/ui"
import { PageContainer } from "~/features/ui/page-container"
import {
	CategorizedDateListsDocument,
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
	const newData = {
		...data,
		specialOffer: specialOfferData,
	}
	return json(newData, {
		headers: { "Set-Cookie": response?.headers.get("Set-Cookie") ?? "" },
	})
}

export default function HomeRoute() {
	return (
		<VStack height={"100%"} justifyContent={"center"} width={"100%"}>
			<p>Doing some plumbing. We will be back soon.</p>
			<Image
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3p5Ynczb2s5bDB1bzN2YzZmaTJwN2ptbjJva3l2cDU2ZjZ5NGp4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HOsHtiVdeypFxOhLAf/giphy.gif"
				alt="mario and luigi"
			/>
		</VStack>
	)
}

// export default function HomeRoute() {
// 	const data = useLoaderData<typeof loader>()
// 	const ref = useRef<HTMLInputElement>(null)
// 	const { isLoggedIn } = useViewer()
// 	return (
// 		<PageContainer
// 			width={{ base: "100%", lg: 1024 }}
// 			padding={{ base: "40px 20px", lg: "40px 0" }}
// 		>
// 			<VStack gap={8}>
// 				<p className={css({ textStyle: "paragraph", fontSize: "20px" })}>
// 					Your personal date concierge in{" "}
// 					<span className={css({ fontWeight: "bold", color: "secondary" })}>
// 						Los Angeles
// 					</span>
// 				</p>
// 				<SearchBar ref={ref} />
// 				{data.specialOffer?.getSpecialOffer && (
// 					<SpecialOffer specialOffer={data.specialOffer.getSpecialOffer} />
// 				)}
// 				{!isLoggedIn() && <LoginBenefitsSection />}
// 				<VStack gap={6} width={"100%"}>
// 					<CategorizedDateLists
// 						categorizedDateLists={data.categorizedDateLists ?? []}
// 					/>
// 					<p>
// 						Want to find more dates? Try{" "}
// 						<button
// 							className={css({
// 								textStyle: "paragraph",
// 								color: "primary",
// 								backgroundColor: "transparent",
// 								border: "none",
// 								cursor: "pointer",
// 								"&:hover": {
// 									textDecoration: "underline",
// 								},
// 							})}
// 							type="button"
// 							onClick={() => ref?.current?.focus()}
// 						>
// 							searching
// 						</button>
// 					</p>
// 				</VStack>
// 			</VStack>
// 		</PageContainer>
// 	)
// }
