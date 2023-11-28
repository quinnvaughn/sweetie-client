import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import {
	Outlet,
	useActionData,
	useLoaderData,
	useParams,
} from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { setFormDefaults, validationError } from "remix-validated-form"
import {
	FreeDateForm,
	FreeDateFormValues,
	freeDateValidator,
} from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import {
	CreateDateStopInput,
	CreateFreeDateDocument,
	GetFreeDateDraftDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { isTypeofFieldError, mapFieldErrorToValidationError, omit } from "~/lib"
import { P, match } from "ts-pattern"

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const result = await freeDateValidator.validate(formData)
	if (result.error) {
		return validationError(result.error)
	}

	const { data } = await gqlFetch(request, CreateFreeDateDocument, {
		input: {
			...omit(result.data, "tagText", "tags", "stops", "nsfw", "id"),
			nsfw: result.data.nsfw === "true",
			stops: result.data.stops.map<CreateDateStopInput>((stop, i) => ({
				...stop,
				order: i + 1,
			})),
			tags: result.data.tags?.filter((v) => v.length > 0) ?? [],
		},
	})

	return match(data?.createFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "FreeDate" }, ({ id }) =>
			redirect($path("/free-date/:id", { id })),
		)
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.otherwise(() => json({ error: "Something went wrong." }))
}

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { data: authData } = await gqlFetch(request, ViewerIsLoggedInDocument)

	if (!authData?.viewer) {
		return redirect($path("/login"))
	}
	const { id } = $params("/free-date/draft/:id", params)

	const { data } = await gqlFetch(request, GetFreeDateDraftDocument, {
		id,
	})

	return match(data?.freeDateDraft)
		.with(P.nullish, () => json({ error: "Free date not found." }))
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.otherwise(
			({ id, nsfw, stops, tags, timesOfDay, description, thumbnail, title }) =>
				json({
					error: null,
					id,
					...setFormDefaults<FreeDateFormValues>("draft-free-date-form", {
						id,
						description: description ?? "",
						thumbnail: thumbnail ?? "",
						nsfw: nsfw ? "true" : "false",
						stops:
							stops.length > 0
								? stops.map(({ title, content, location }) => ({
										title: title ?? "",
										content: content ?? "",
										location: {
											id: location?.id ?? "",
											name: location?.name ?? "",
										},
								  }))
								: [{ content: "", location: { id: "", name: "" }, title: "" }],
						tags: tags.map(({ name }) => name),
						tagText: "",
						timesOfDay: timesOfDay.map(
							({ name }) => name,
						) as FreeDateFormValues["timesOfDay"],
						title: title ?? "",
					}),
				}),
		)
}

export default function DraftRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	const params = useParams()
	const { id } = $params("/free-date/draft/:id", params)
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<Outlet />
			{!isTypeofFieldError(loaderData) && loaderData.error ? (
				<p className={css({ textStyle: "error" })}>{loaderData.error}</p>
			) : (
				<FreeDateForm
					locationPath={$path("/free-date/draft/:id/add-location", {
						id,
					})}
					formId="draft-free-date-form"
					page="draft"
					error={!isTypeofFieldError(actionData) ? actionData?.error : ""}
				/>
			)}
		</PageContainer>
	)
}
