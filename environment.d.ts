declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test"
			GOOGLE_MAPS_API_KEY: string
			GRAPHQL_ENDPOINT: string
			FRONTEND_URL: string
		}
	}
}

export {}
