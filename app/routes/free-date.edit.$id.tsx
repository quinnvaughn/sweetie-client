import {
	DataFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node"
import { Outlet, useFetcher, useLoaderData, useParams } from "@remix-run/react"
import { $params, $path } from "remix-routes"
import { setFormDefaults, validationError } from "remix-validated-form"
import { P, match } from "ts-pattern"
import {
	FreeDateForm,
	FreeDateFormValues,
	freeDateValidator,
} from "~/features/free-date"
import { PageContainer } from "~/features/ui"
import {
	GetEditFreeDateDocument,
	UpdateDateStopInput,
	UpdateFreeDateDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import {
	getHourAndMinutes,
	getMinutes,
	isTypeofFieldError,
	mapFieldErrorToValidationError,
	omit,
} from "~/lib"
import { css } from "~/styled-system/css"

export async function action({ request, params }: DataFunctionArgs) {
	const { id } = $params("/free-date/edit/:id", params)
	const formData = await request.formData()
	const result = await freeDateValidator.validate(formData)
	if (result.error) {
		return validationError(result.error)
	}

	const { data } = await gqlFetch(request, UpdateFreeDateDocument, {
		input: {
			id,
			...omit(result.data, "tagText", "tags", "stops", "nsfw", "id"),
			nsfw: result.data.nsfw === "true",
			stops: result.data.stops.map<UpdateDateStopInput>((stop, i) => ({
				...stop,
				order: i + 1,
				estimatedTime: getMinutes(stop.estimatedTime),
			})),
			tags: result.data.tags?.filter((v) => v.length > 0) ?? [],
		},
	})
	return match(data?.updateFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with({ __typename: "FreeDate" }, () =>
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
	const { id } = $params("/free-date/edit/:id", params)

	const { data } = await gqlFetch(request, GetEditFreeDateDocument, {
		id,
	})

	return match(data?.getEditFreeDate)
		.with(P.nullish, () => json({ error: "Free date not found." }))
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "Error" }, ({ message }) => json({ error: message }))
		.with(
			{ __typename: "FreeDate" },
			({ description, nsfw, stops, tags, thumbnail, title, recommendedTime }) =>
				json({
					error: null,
					...setFormDefaults<FreeDateFormValues>("edit-free-date-form", {
						description,
						thumbnail,
						nsfw: nsfw ? "true" : "false",
						recommendedTime,
						stops: stops.map(({ title, content, location, estimatedTime }) => ({
							title,
							content,
							estimatedTime: getHourAndMinutes(estimatedTime),
							location: {
								id: location.id,
								name: location.name,
							},
						})),
						tags: tags.map(({ name }) => name),
						tagText: "",
						title,
					}),
				}),
		)
		.otherwise(() => json({ error: "Something went wrong." }))
}

export default function EditFreeDateRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const params = useParams()
	const { id } = $params("/free-date/edit/:id", params)
	const fetcher = useFetcher<typeof action>()
	return (
		<PageContainer
			tastemaker
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<Outlet />
			{loaderData.error ? (
				<p className={css({ textStyle: "error" })}>{loaderData.error}</p>
			) : (
				<FreeDateForm
					fetcher={fetcher}
					locationPath={$path("/free-date/edit/:id/add-location", { id })}
					formId="edit-free-date-form"
					page="edit"
					error={!isTypeofFieldError(fetcher.data) ? fetcher.data?.error : ""}
				/>
			)}
		</PageContainer>
	)
}
