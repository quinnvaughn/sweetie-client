import {
	DataFunctionArgs,
	json,
	unstable_parseMultipartFormData,
} from "@remix-run/node"

export async function action({ request }: DataFunctionArgs) {
	// TODO: Fix this.
	// const formData = await unstable_parseMultipartFormData(
	// 	request,
	// 	(part) => ,
	// )
}
