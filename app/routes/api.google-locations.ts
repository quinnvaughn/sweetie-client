import { LoaderFunctionArgs, json } from "@remix-run/node"
import { GetGoogleLocationsDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const text = url.searchParams.get("text")
	if (!text) {
		return json({ locations: [] })
	}
	const { data } = await gqlFetch(request, GetGoogleLocationsDocument, { text })
	return json({
		locations: data?.getGoogleLocations || [],
	})
}
