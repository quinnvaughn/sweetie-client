import { zodResolver } from "@hookform/resolvers/zod"
import { ActionFunctionArgs, json } from "@remix-run/server-runtime"
import { getValidatedFormData } from "remix-hook-form"
import { z } from "zod"
import { SignUpForWaitlistDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"

const signUpForWaitlist = z.object({
	code: z.string().length(6).optional(),
	groupDateId: z.string(),
})

export type FormData = z.infer<typeof signUpForWaitlist>

const resolver = zodResolver(signUpForWaitlist)

export async function action({ request }: ActionFunctionArgs) {
	const {
		errors,
		data,
		receivedValues: defaultValues,
	} = await getValidatedFormData<FormData>(request, resolver)
	console.log({ errors, data, defaultValues })
	if (errors) {
		return json({ errors, defaultValues })
	}

	const { data: signupData } = await gqlFetch(
		request,
		SignUpForWaitlistDocument,
		{
			input: data,
		},
	)

	// TODO: Add error handling for signupData
	return json({ signupData })
}
