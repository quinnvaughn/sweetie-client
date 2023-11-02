import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"
import { ApolloProvider } from "@apollo/client/react/index.js"
import styles from "./index.css"
import { LinksFunction } from "@remix-run/node"
import { client } from "~/graphql/client"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ApolloProvider client={client}>
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</ApolloProvider>
			</body>
		</html>
	)
}
