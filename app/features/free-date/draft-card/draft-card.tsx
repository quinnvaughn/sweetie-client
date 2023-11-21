import { Link, useFetcher } from "@remix-run/react"
import { FaEdit, FaTrash } from "react-icons/fa/index.js"
import { $path } from "remix-routes"
import { P, match } from "ts-pattern"
import { DraftCardFragment } from "~/graphql/generated"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	admin?: boolean
	draft: DraftCardFragment
}

export function DraftCard({ draft, admin }: Props) {
	const { getViewerId } = useViewer()
	const fetcher = useFetcher()

	function deleteDraft() {
		fetcher.submit(
			{ id: draft.id },
			{
				method: "post",
				action: $path("/api/delete-draft"),
			},
		)
	}

	return (
		<VStack gap={2} alignItems="flex-start">
			{!admin && draft.author.id === getViewerId() && (
				<HStack
					gap={4}
					justifyContent="flex-end"
					alignItems="flex-start"
					width={"100%"}
				>
					<Link
						className={css({
							textStyle: "paragraph",
							fontWeight: "bold",
							_hover: { textDecoration: "underline" },
						})}
						to={$path("/free-date/draft/:id", { id: draft.id })}
						prefetch="intent"
					>
						<FaEdit className={css({ color: "black" })} size={26} />
					</Link>
					<button
						type="button"
						className={css({
							textStyle: "paragraph",
							fontWeight: "bold",
							cursor: "pointer",
							_hover: { textDecoration: "underline" },
						})}
						onClick={deleteDraft}
					>
						<FaTrash className={css({ color: "black" })} size={26} />
					</button>
				</HStack>
			)}
			<VStack gap={4} alignItems="flex-start" width={"100%"}>
				{match(draft.thumbnail)
					.with(P.union("", undefined, null), () => (
						<div
							className={css({
								backgroundColor: "gray",
								borderRadius: "8px",
								aspectRatio: "20/19",
								width: "100%",
							})}
						/>
					))
					.with(P.string, (thumbnail) => (
						<img
							alt={"draft card thumbnail"}
							className={css({
								backgroundColor: "gray",
								borderRadius: "8px",
								aspectRatio: "20/19",
								width: "100%",
								objectFit: "cover",
							})}
							src={thumbnail}
						/>
					))
					.run()}
				<VStack gap={2} alignItems="flex-start">
					<span className={css({ fontWeight: "600" })}>
						{draft.title || "Untitled"}
					</span>
				</VStack>
				{admin && (
					<HStack gap={2}>
						<p className={css({ textStyle: "paragraph" })}>
							{draft.author.name}
						</p>
						<a
							className={css({ color: "black", _visited: { color: "black" } })}
							href={`mailto:${draft.author.email}`}
						>
							{draft.author.email}
						</a>
					</HStack>
				)}
			</VStack>
		</VStack>
	)
}
