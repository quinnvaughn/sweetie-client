import { MetaFunction } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { ShareModal } from "~/features/ui"

// TODO: Check if date actually exists.

export const meta: MetaFunction = () => {
	return [{ name: "robots", content: "noindex" }]
}

export default function ShareFreeDateRoute() {
	const params = useParams()
	const { id } = $params("/free-date/:id/share", params)
	return (
		<ShareModal
			to={$path("/free-date/:id", { id })}
			title="Share"
			aboveText="Share this free date with your friends or followers!"
			campaign="free date share modal"
		/>
	)
}
