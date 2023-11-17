import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { setFormDefaults, validationError } from "remix-validated-form"
import { match } from "ts-pattern"
import {
	FreeDateForm,
	FreeDateFormValues,
	freeDateValidator,
} from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import {
	GetDateExperienceDocument,
	GetEditDateExperienceDocument,
	GetEditDateExperiencePayload,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await freeDateValidator.validate(formData)
	if (result.error) {
		return validationError(result.error)
	}
	console.log(result.data)
	// TODO: Edit date experience mutation.
	// const { data } = await gqlFetch(request, CreateFreeDateDocument, {
	// 	input: {
	// 		// TODO: add thumbnail
	// 		...omit(result.data, "tagText", "tags"),
	// 		tags: result.data.tags ?? [],
	// 	},
	// })
	return null
}

export async function loader({ params, request }: LoaderFunctionArgs) {
	// check if user is logged in.
	// check if user is logged in
	const { data: authData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!authData?.viewer) {
		return redirect($path("/login"))
	}
	const { id } = $params("/free-date/edit/:id", params)

	const { data } = await gqlFetch(request, GetEditDateExperienceDocument, {
		id,
	})

	if (!data?.getEditDateExperience) {
		return json({ error: "Free date not found." })
	}

	if (data.getEditDateExperience.__typename !== "DateExperience") {
		return json({ error: data.getEditDateExperience.message })
	}

	const { description, nsfw, stops, tags, thumbnail, timesOfDay, title } =
		data.getEditDateExperience

	return json({
		error: null,
		...setFormDefaults<FreeDateFormValues>("edit-free-date-form", {
			description,
			thumbnail,
			nsfw: nsfw ? "true" : "false",
			stops: stops.map(({ title, content, location }) => ({
				title,
				content,
				location: {
					id: location.id,
					name: location.name,
				},
			})),
			tags: tags.map(({ name }) => name),
			tagText: "",
			timesOfDay: timesOfDay.map(
				({ name }) => name,
			) as FreeDateFormValues["timesOfDay"],
			title,
		}),
	})
}

export default function EditFreeDateRoute() {
	const loaderData = useLoaderData<typeof loader>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			{loaderData.error ? (
				<p className={css({ textStyle: "error" })}>{loaderData.error}</p>
			) : (
				<FreeDateForm formId="edit-free-date-form" page="edit" />
			)}
		</PageContainer>
	)
}
