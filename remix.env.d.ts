/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

interface Window {
	ENV: {
		GOOGLE_MAPS_API_KEY: string
		GRAPHQL_ENDPOINT: string
		FRONTEND_URL: string
		NODE_ENV: "development" | "production" | "test"
	}
}
