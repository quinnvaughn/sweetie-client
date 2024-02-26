import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { $params, $path } from "remix-routes"
import { ShareModal } from "~/features/ui"
import { GetGroupDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useTrack } from "~/hooks"
import { getEnv } from "~/lib"

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetGroupDateDocument, {
		groupDateId: id,
	})

	if (!data?.groupDate) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.groupDate.__typename === "GroupDate")) {
		throw new Response("Not Found", { status: 404 })
	}
	return json({
		groupDate: data.groupDate,
	})
}

export const meta: MetaFunction = () => {
	return [{ name: "robots", content: "noindex" }]
}

export default function ShareEventRoute() {
	const params = useParams()
	const { id } = $params("/group-date/:id/share", params)
	const track = useTrack()
	const { groupDate } = useLoaderData<typeof loader>()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// So we can track the percentage of people who open the modal vs who actually share.
		track("User Opened Share Group Date Modal", {
			title: groupDate.title,
			tastemaker_name: groupDate.tastemaker.user.name,
		})
	}, [])

	return (
		<ShareModal
			to={$path("/group-date/:id", { id })}
			shareUrl={`${getEnv().FRONTEND_URL}${$path("/group-date/:id", { id })}`}
			title="Share this group date"
			aboveText="Share with your date or your friends!"
			campaign="group date share modal"
		/>
	)
}
