import { LoaderFunctionArgs, json } from "@remix-run/node"
import { GetCitiesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const text = url.searchParams.get("text")
	const selected = url.searchParams.getAll("selected") as string[]
	if (!text) return json({ cities: [] })
	const { data } = await gqlFetch(request, GetCitiesDocument, {
		text,
		selected,
	})
	if (data?.cities.edges) {
		return json({ cities: data.cities.edges.map((edge) => edge.node) })
	}
	return json({ cities: [] })
}
