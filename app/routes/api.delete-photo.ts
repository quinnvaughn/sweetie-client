import { DataFunctionArgs, json, redirect } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { $path } from "remix-routes"
import { validationError } from "remix-validated-form"
import { z } from "zod"
import {
	DeleteImageDocument,
	GeneratePresignedUrlDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const schema = z.object({
	filename: z.string(),
	folder: z.string(),
})

const validator = withZod(schema)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()

	const result = await validator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}

	const { filename, folder } = result.data
	const { data } = await gqlFetch(request, DeleteImageDocument, {
		input: {
			filename,
			folder,
		},
	})
	if (data?.deleteImage.__typename === "AuthError") {
		return redirect($path("/login"))
	}
	console.log({ data })
	return json({
		data:
			data?.deleteImage.__typename === "DeleteImageResult"
				? data?.deleteImage.data
				: null,
	})
}
