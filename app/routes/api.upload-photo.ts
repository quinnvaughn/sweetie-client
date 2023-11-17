import { DataFunctionArgs, json } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { validationError } from "remix-validated-form"
import { z } from "zod"
import { GeneratePresignedUrlDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const schema = z.object({
	filename: z.string(),
	contentType: z.string(),
	folder: z.string(),
})

const validator = withZod(schema)

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()

	const result = await validator.validate(formData)

	if (result.error) {
		return validationError(result.error)
	}

	const { filename, contentType, folder } = result.data
	const { data } = await gqlFetch(request, GeneratePresignedUrlDocument, {
		input: {
			filename,
			contentType,
			folder,
		},
	})
	return json({ presignedURL: data?.generatePresignedUrl, contentType })
}
