import { $path } from "remix-routes"
import { ShareModal } from "~/features/ui"

// TODO: Check if user is logged in

export default function ShareRoute() {
	return (
		<ShareModal
			to={$path("/tastemaker/free-dates/created")}
			title="Share your profile"
			aboveText="Share your profile with your friends or followers!"
			campaign="created dates share profile share modal"
		/>
	)
}
