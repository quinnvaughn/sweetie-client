import type { CodegenConfig } from "@graphql-codegen/cli"
require("dotenv").config()

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.BLOG_URL,
	documents: "app/blog/**/*.graphql",
	config: {
		scalars: {
			DateTime: "string",
			Date: "string",
			Upload: "File",
		},
	},
	generates: {
		"app/graphql/blog-generated.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
			config: {
				// avoidOptionals: true,
				nonOptionalTypename: true,
			},
		},
	},
}

export default config
