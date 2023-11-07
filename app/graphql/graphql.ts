import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import {
	DocumentNode,
	ExecutableDefinitionNode,
	GraphQLError,
	Kind,
	OperationTypeNode,
	print,
} from "graphql"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type GqlFetchResult<TData = any> = {
	data?: TData
	errors?: Error[]
	response?: Response
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gqlFetch<TData = any, TVariables = Record<string, any>>(
	request: Request,
	operation: TypedDocumentNode<TData, TVariables>,
	variables?: TVariables,
): Promise<GqlFetchResult<TData>>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gqlFetch<TData = any, TVariables = Record<string, any>>(
	request: Request,
	operation: DocumentNode,
	variables?: TVariables,
): Promise<GqlFetchResult<TData>> {
	const props = operation.definitions[0] as ExecutableDefinitionNode

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const requestBody: any = { query: print(operation) }

	if (variables) requestBody.variables = variables

	try {
		const response = await fetch(
			`http://localhost:4000?operation=${props.name?.value}}`,
			{
				credentials: "include",
				body: JSON.stringify(requestBody),
				headers: {
					cookie: request.headers.get("cookie") || "",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				method: "POST",
			},
		)

		if (response.ok) {
			const value = await response.json()
			return { ...value, response }
		}
		return {
			errors: [
				{
					message: await response.text(),
				} as GraphQLError,
			],
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unhandled error"
		return {
			errors: [
				{
					message: message,
				} as GraphQLError,
			],
		}
	}
}
