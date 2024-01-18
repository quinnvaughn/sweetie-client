import { Link, useFetcher, useLocation } from "@remix-run/react"
import { useEffect } from "react"
import { $path } from "remix-routes"
import { FreeDateCardFragment } from "~/graphql/generated"
import { useToast } from "~/hooks"
import { action } from "~/routes/api.archive-date"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { flex } from "~/styled-system/patterns"
import { FreeDateCard } from ".."

type Props = {
	date: FreeDateCardFragment
}

export function EditFreeDate({ date }: Props) {
	const fetcher = useFetcher<typeof action>()

	const { pathname } = useLocation()

	const isArchivedPage = pathname.includes("archived")
	const { success, error } = useToast()

	const data = fetcher.data

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data?.error) {
			error(data.error)
		} else if (data?.data) {
			success(
				`We successfully ${isArchivedPage ? "restored" : "archived"} "${
					date.title
				}"`,
			)
		}
	}, [data, isArchivedPage, date])

	function retireDate() {
		fetcher.submit(
			{ id: date.id, type: isArchivedPage ? "restore" : "archive" },
			{ method: "POST", action: $path("/api/archive-date") },
		)
	}

	return (
		<VStack gap={2} alignItems="flex-start">
			<div className={flex({ justifyContent: "space-between", width: "100%" })}>
				<Link
					className={css({
						fontWeight: "bold",
						_hover: { textDecoration: "underline" },
						textStyle: "paragraph",
					})}
					to={$path("/free-date/edit/:id", { id: date.id })}
					prefetch="intent"
				>
					Edit
				</Link>
				<button
					className={css({
						fontWeight: "bold",
						cursor: "pointer",
						_hover: { textDecoration: "underline" },
						textStyle: "paragraph",
					})}
					type="button"
					onClick={retireDate}
				>
					{isArchivedPage ? "Restore" : "Archive"}
				</button>
			</div>
			<FreeDateCard date={date} />
		</VStack>
	)
}
