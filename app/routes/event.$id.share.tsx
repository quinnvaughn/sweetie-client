import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { $params, $path } from "remix-routes"
import { ShareModal } from "~/features/ui"
import { GetEventDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useTrack } from "~/hooks"
import { getEnv } from "~/lib"

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetEventDocument, { eventId: id })

	if (!data?.event) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.event.__typename === "Event")) {
		throw new Response("Not Found", { status: 404 })
	}
	return json({
		event: data.event,
	})
}

export const meta: MetaFunction = () => {
	return [{ name: "robots", content: "noindex" }]
}

export default function ShareEventRoute() {
	const params = useParams()
	const { id } = $params("/event/:id/share", params)
	const track = useTrack()
	const { event } = useLoaderData<typeof loader>()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// So we can track the percentage of people who open the modal vs who actually share.
		track("User Opened Share Event Modal", {
			title: event.title,
			tastemaker_name: event.tastemaker.user.name,
		})
	}, [])

	return (
		<ShareModal
			to={$path("/event/:id", { id })}
			shareUrl={`${getEnv().FRONTEND_URL}${$path("/event/:id", { id })}`}
			title="Share this event"
			aboveText="Share with your date or your friends!"
			campaign="event share modal"
		/>
	)
}
