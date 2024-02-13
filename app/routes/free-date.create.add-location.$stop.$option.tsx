import { $path } from "remix-routes"
import { AddLocation } from "~/features/location"

export default function AddLocationRoute() {
	return <AddLocation redirectTo={$path("/free-date/create")} />
}
