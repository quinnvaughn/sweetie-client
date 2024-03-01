import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { $params } from "remix-routes"
import { match } from "ts-pattern"
import { GetAdminGroupDateDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { id } = $params("/group-date/:id", params)
	const { data } = await gqlFetch(request, GetAdminGroupDateDocument, {
		groupDateId: id,
	})
	return match(data?.groupDate)
		.with({ __typename: "Error" }, () => {
			throw new Error("Group date not found")
		})
		.with({ __typename: "GroupDate" }, (groupDate) => {
			return json({ groupDate })
		})
		.otherwise(() => {
			throw new Error("Group date not found")
		})
}

const tableItem = css.raw({
	padding: "8px",
	border: "1px solid",
	borderColor: "gray",
})

const headerItem = css(tableItem, {
	fontWeight: "bold",
	backgroundColor: "black",
	color: "white",
})

export default function AdminGroupDateRoute() {
	const { groupDate } = useLoaderData<typeof loader>()
	return (
		<VStack alignItems={"flex-start"} gap={6} width={"100%"}>
			<h1 className={css({ textStyle: "h1" })}>{groupDate.title}</h1>
			<p>
				{groupDate.numUsersSignedUp}/{groupDate.numSpots} spots
			</p>
			<table>
				<thead>
					<tr>
						<th className={headerItem}>Name</th>
						<th className={headerItem}>Email</th>
						<th className={headerItem}>Waitlist Group</th>
					</tr>
				</thead>
				<tbody>
					{groupDate.waitlistGroups.map((wg) =>
						wg.users.map((user) => (
							<tr key={user.id}>
								<td className={css(tableItem)}>{user.name}</td>
								<td className={css(tableItem)}>
									<a
										className={css({
											color: "secondary",
											textDecoration: "underline",
										})}
										href={`mailto:${user.email}`}
									>
										{user.email}
									</a>
								</td>
								<td className={css(tableItem)}>{wg.code}</td>
							</tr>
						)),
					)}
				</tbody>
			</table>
		</VStack>
	)
}
