import { useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { AddLocation } from "~/features/location"

export default function AddLocationRoute() {
	const params = useParams()
	const { id } = $params("/free-date/draft/:id", params)
	return <AddLocation redirectTo={$path("/free-date/draft/:id", { id })} />
}
