import { useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { AddLocation } from "~/features/location"

export default function AddLocationRoute() {
	const params = useParams()
	const { id } = $params("/free-date/edit/:id", params)
	return <AddLocation redirectTo={$path("/free-date/edit/:id", { id })} />
}
