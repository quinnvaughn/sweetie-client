import { DataFunctionArgs, json } from "@remix-run/node"
import { UpdateUserProfileDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const avatar = formData.get("avatar") as string

	if (!avatar) {
		return json({ error: "No avatar provided" }, { status: 400 })
	}

	const { data } = await gqlFetch(request, UpdateUserProfileDocument, {
		input: { avatar },
	})

	if (!data?.updateUserProfile) {
		return json({ error: "Unable to update avatar" })
	}

	return json({ success: true })
}
