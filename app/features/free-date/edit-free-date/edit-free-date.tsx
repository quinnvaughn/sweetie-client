import { Link, useFetcher, useLocation } from "@remix-run/react"
import { $path } from "remix-routes"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FreeDateCard } from ".."
import { flex } from "~/styled-system/patterns"
import { action } from "~/routes/api.retire-date"
import { useEffect } from "react"
import { useToast } from "~/hooks"

type Props = {
	date: FreeDateCardFragment
}

export function EditFreeDate({ date }: Props) {
	const fetcher = useFetcher<typeof action>()

	const { pathname } = useLocation()

	const isRetiredPage = pathname.includes("retired")
	const { success, error } = useToast()

	const data = fetcher.data

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data?.error) {
			error(data.error)
		} else if (data?.data) {
			success(
				`We successfully ${isRetiredPage ? "unretired" : "retired"} "${
					date.title
				}"`,
			)
		}
	}, [data, isRetiredPage, date])

	function retireDate() {
		fetcher.submit(
			{ id: date.id, type: isRetiredPage ? "unretire" : "retire" },
			{ method: "POST", action: $path("/api/retire-date") },
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
					{isRetiredPage ? "Unretire" : "Retire"}
				</button>
			</div>
			<FreeDateCard date={date} />
		</VStack>
	)
}
