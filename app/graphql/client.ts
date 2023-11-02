import { ApolloClient } from "@apollo/client/core/index.js"
import { InMemoryCache } from "@apollo/client/cache/index.js"
import { createHttpLink } from "@apollo/client/link/http/index.js"

// Initialize Apollo client
export const client = new ApolloClient({
	ssrMode: true, // Indicates that we want to use server side rendering
	link: createHttpLink({
		// Use createHttpLink instead of uri
		uri: "http://localhost:4000", //Path to GraphQL schema
		credentials: "include",
		headers: {
			"Access-Control-Allow-Origin": "*", //Cors management
		},
	}),
	cache: new InMemoryCache(), // Cache management
})
