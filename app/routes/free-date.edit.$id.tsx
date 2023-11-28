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
	GetEditFreeDateDocument,
	UpdateDateStopInput,
	UpdateFreeDateDocument,
	ViewerIsLoggedInDocument,
} from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import {
	isTypeofFieldError,
	mapFieldErrorToValidationError,
	mixpanel,
	omit,
} from "~/lib"
import { match } from "ts-pattern"

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
			})),
			tags: result.data.tags?.filter((v) => v.length > 0) ?? [],
		},
	})
	return match(data?.updateFreeDate)
		.with({ __typename: "AuthError" }, () => redirect($path("/login")))
		.with({ __typename: "FieldErrors" }, ({ fieldErrors }) =>
			validationError(mapFieldErrorToValidationError(fieldErrors)),
		)
		.with(
			{ __typename: "FreeDate" },
			({ id, stops, timesOfDay, tags, nsfw }) => {
				mixpanel.track("Free Date Updated", {
					free_date_id: id,
					num_stops: stops?.length,
					times_of_day: timesOfDay.map((tod) => tod.name),
					num_tags: tags?.length,
					nsfw,
					tags: tags.map((tag) => tag.name),
				})
				return redirect($path("/free-date/:id", { id }))
			},
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

	if (!data?.getEditFreeDate) {
		return json({ error: "Free date not found." })
	}

	if (data.getEditFreeDate.__typename !== "FreeDate") {
		return json({ error: data.getEditFreeDate.message })
	}

	const { description, nsfw, stops, tags, thumbnail, timesOfDay, title } =
		data.getEditFreeDate

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
	const actionData = useActionData<typeof action>()
	const params = useParams()
	const { id } = $params("/free-date/edit/:id", params)
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
					locationPath={$path("/free-date/edit/:id/add-location", { id })}
					formId="edit-free-date-form"
					page="edit"
					error={!isTypeofFieldError(actionData) ? actionData?.error : ""}
				/>
			)}
		</PageContainer>
	)
}
