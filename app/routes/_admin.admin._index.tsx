import { Link, useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { $path } from "remix-routes"
import { GetGroupDatesDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	// get all group dates.
	const { data } = await gqlFetch(request, GetGroupDatesDocument)

	return json(data)
}

export default function AdminIndexRoute() {
	const { groupDates } = useLoaderData<typeof loader>()
	return (
		<VStack width={"100%"} alignItems="flex-start">
			<h1 className={css({ textStyle: "h1" })}>Group dates</h1>
			<ul>
				{groupDates?.map((groupDate) => (
					<li key={groupDate.id}>
						<Link
							className={css({
								textDecoration: "underline",
								color: "secondary",
							})}
							to={$path("/admin/group-date/:id", { id: groupDate.id })}
						>
							{groupDate.title}
						</Link>
					</li>
				))}
			</ul>
		</VStack>
	)
}
