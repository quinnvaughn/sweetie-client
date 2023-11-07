import { z } from "zod"

const env = z
	.object({
		GRAPHQL_ENDPOINT: z.string().url(),
		GOOGLE_MAPS_API_KEY: z.string(),
		MIXPANEL_TOKEN: z.string(),
		MIXPANEL_PROXY: z.string().url(),
		ENVIRONMENT: z.enum(["development", "production"]).optional(),
		FRONTEND_URL: z.string().url(),
	})
	.parse(process.env)

export const config = {
	...env,
}
