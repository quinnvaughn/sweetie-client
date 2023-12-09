import {
	DataFunctionArgs,
	LinksFunction,
	MetaFunction,
	json,
} from "@remix-run/node"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react"
import { createPortal } from "react-dom"
import { ClientOnly } from "remix-utils/client-only"
import { RouterProvider } from "./context"
import { PageContainer, ToastContainer } from "./features/ui"
import { ViewerIsLoggedInDocument } from "./graphql/generated"
import { gqlFetch } from "./graphql/graphql"
import styles from "./index.css"
import { css } from "./styled-system/css"
import { VStack } from "./styled-system/jsx"

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
	},
]

export async function loader({ request }: DataFunctionArgs) {
	const { data } = await gqlFetch(request, ViewerIsLoggedInDocument)
	const env = process.env
	return json({
		data,
		ENV: {
			GOOGLE_MAPS_API_KEY: env.GOOGLE_MAPS_API_KEY,
			GRAPHQL_ENDPOINT: env.GRAPHQL_ENDPOINT,
			FRONTEND_URL: env.FRONTEND_URL,
			NODE_ENV: env.NODE_ENV,
		},
	})
}

export function ErrorBoundary() {
	const error = useRouteError()
	return (
		<html lang="en">
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<PageContainer
					width={{ base: "100%", md: "500px" }}
					padding={{ base: "20px" }}
				>
					<VStack gap={4} width={"100%"}>
						<h1 className={css({ textStyle: "h1" })}>Oh no!</h1>
						<p className={css({ textStyle: "paragraph" })}>
							{isRouteErrorResponse(error)
								? error.statusText
								: "Something went wrong"}
						</p>
					</VStack>
				</PageContainer>
				<Scripts />
			</body>
		</html>
	)
}
export const meta: MetaFunction = () => {
	return [
		{ title: "Sweetie - Find the best date ideas in Los Angeles" },
		{
			name: "description",
			content:
				"Whether you're single or in a relationship, we have all the dates you want in Los Angeles, all for free.",
		},
		{
			name: "keywords",
			content:
				"dating, los angeles, dates, fun, love, romance, couples, single",
		},
		{ name: "author", content: "Sweetie" },
		{
			name: "og:description",
			content:
				"Whether you're single or in a relationship, we have all the dates you want in Los Angeles, all for free.",
		},
		{
			name: "og:title",
			content: "Sweetie - Find the best dates to go on in Los Angeles",
		},
		{
			name: "og:type",
			content: "website",
		},
		{
			name: "og:url",
			content: "https://trysweetie.com",
		},
		{
			name: "og:image",
			content:
				"https://www.eharmony.com/wp-content/uploads/2020/08/los-angeles-singles-1024x576.jpg",
		},
		{
			name: "og:image:secure_url",
			content:
				"https://www.eharmony.com/wp-content/uploads/2020/08/los-angeles-singles-1024x576.jpg",
		},
	]
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<RouterProvider>
					<Outlet />
				</RouterProvider>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<ScrollRestoration />
				<Scripts />
				<ClientOnly>
					{() => createPortal(<ToastContainer />, document.body)}
				</ClientOnly>
				<LiveReload />
			</body>
		</html>
	)
}
