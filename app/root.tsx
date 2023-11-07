import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react"
import styles from "./index.css"
import { DataFunctionArgs, LinksFunction, json } from "@remix-run/node"
import { gqlFetch } from "./graphql/graphql"
import { ViewerIsLoggedInDocument } from "./graphql/generated"
import { config } from "config.server"
import { createPortal } from "react-dom"
import { ToastContainer } from "./features/ui"
import { ClientOnly } from "remix-utils/client-only"

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
	return json({
		data,
		ENV: {
			GOOGLE_MAPS_API_KEY: config.GOOGLE_MAPS_API_KEY,
			GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
			MIXPANEL_TOKEN: config.MIXPANEL_TOKEN,
			MIXPANEL_PROXY: config.MIXPANEL_PROXY,
			FRONTEND_URL: config.FRONTEND_URL,
			ENVIRONMENT: config.ENVIRONMENT,
		},
	})
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
				<Outlet />
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
