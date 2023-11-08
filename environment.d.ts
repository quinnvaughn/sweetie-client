declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test"
			GOOGLE_MAPS_API_KEY: string
			GRAPHQL_ENDPOINT: string
			MIXPANEL_TOKEN: string
			MIXPANEL_PROXY: string
			FRONTEND_URL: string
		}
	}
}

export {}
