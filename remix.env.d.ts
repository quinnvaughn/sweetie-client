/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

interface Window {
	ENV: {
		GOOGLE_MAPS_API_KEY: string
		GRAPHQL_ENDPOINT: string
		MIXPANEL_TOKEN: string
		MIXPANEL_PROXY: string
		FRONTEND_URL: string
		ENVIRONMENT: string
	}
}
