import { Readable } from "stream"
import { Storage } from "@google-cloud/storage"
import { UploadHandler } from "@remix-run/node"

const private_key = process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY.replace(
	/\\n/gm,
	"\n",
)

export const storage = new Storage({
	credentials: {
		private_key,
		client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
	},
	projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

const bucket = storage.bucket(process.env.IMAGE_BUCKET)

async function uploadStreamToCloudStorage(
	filename: string,
	contentType: string,
	data: AsyncIterable<Uint8Array>,
) {
	/// TODO: Fix this.
	const dataArray = []
	for await (const x of data) {
		dataArray.push(x)
	}

	const file = new File(dataArray, filename, { type: contentType })

	const fileStream = file.stream()
}

type UploadHandlerArgs = {
	filename: string
	contentType: string
	data: AsyncIterable<Uint8Array>
	userId: string
	folder: string
}

export const cloudStorageUploaderHandler = async ({
	userId,
	folder,
	filename,
	contentType,
	data,
}: UploadHandlerArgs) => {
	const newFileName = `${userId}/${folder}/${filename}`
	return await uploadStreamToCloudStorage(newFileName, contentType, data)
}
