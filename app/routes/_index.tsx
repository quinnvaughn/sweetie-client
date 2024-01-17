import { DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { GetUserToLoginSection } from "~/features/auth"
import { CategorizedDateLists } from "~/features/free-date"
import { SearchBar } from "~/features/search"
import { PageContainer } from "~/features/ui/page-container"
import { CategorizedDateListsDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: DataFunctionArgs) {
	const { data, response } = await gqlFetch(
		request,
		CategorizedDateListsDocument,
	)
	return json(data, {
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
				{!isLoggedIn() && <GetUserToLoginSection />}
				<VStack gap={6} width={"100%"}>
					<CategorizedDateLists
						categorizedDateLists={data.categorizedDateLists}
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
