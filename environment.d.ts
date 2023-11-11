declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test"
			GOOGLE_MAPS_API_KEY: string
			GRAPHQL_ENDPOINT: string
			MIXPANEL_TOKEN: string
			MIXPANEL_PROXY: string
			FRONTEND_URL: string
			GOOGLE_CREDENTIALS_PRIVATE_KEY: string
			GOOGLE_CREDENTIALS_CLIENT_EMAIL: string
			GOOGLE_CLOUD_PROJECT_ID: string
			IMAGE_BUCKET: string
		}
	}
}

export {}
