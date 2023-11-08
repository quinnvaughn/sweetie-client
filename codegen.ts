import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:4000",
	documents: "app/graphql/**/*.graphql",
	config: {
		scalars: {
			DateTime: "string",
			Date: "string",
			Upload: "File",
		},
	},
	generates: {
		"app/graphql/generated.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
			config: {
				// avoidOptionals: true,
				nonOptionalTypename: true,
			},
		},
	},
}

export default config
