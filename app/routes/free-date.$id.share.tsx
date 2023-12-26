import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { $params, $path } from "remix-routes"
import { ShareModal } from "~/features/ui"
import { GetFreeDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { useTrack } from "~/hooks"

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/free-date/:id/add-to-calendar", params)
	const { data } = await gqlFetch(request, GetFreeDateDocument, { id })

	if (!data?.freeDate) {
		throw new Response("Not Found", { status: 404 })
	}
	if (!(data.freeDate.__typename === "FreeDate")) {
		throw new Response("Not Found", { status: 404 })
	}
	return json({
		freeDate: data.freeDate,
	})
}

// TODO: Check if date actually exists.

export const meta: MetaFunction = () => {
	return [{ name: "robots", content: "noindex" }]
}

export default function ShareFreeDateRoute() {
	const params = useParams()
	const { id } = $params("/free-date/:id/share", params)
	const track = useTrack()
	const { freeDate } = useLoaderData<typeof loader>()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// So we can track the percentage of people who open the modal vs who actually share.
		track("User Opened Share Free Date Modal", {
			title: freeDate.title,
			tastemaker_name: freeDate.tastemaker.user.name,
		})
	}, [])

	return (
		<ShareModal
			to={$path("/free-date/:id", { id })}
			title="Share"
			aboveText="Share this free date with your friends or followers!"
			campaign="free date share modal"
		/>
	)
}
