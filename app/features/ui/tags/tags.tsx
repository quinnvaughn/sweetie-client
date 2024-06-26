import { Link } from "@remix-run/react"
import { useState } from "react"
import { $path } from "remix-routes"
import { TagsFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

const tagStyles = css.raw({
	color: "white",
	backgroundColor: "secondary",
	overflow: "visible",
	borderRadius: "20px",
	padding: "0px 16px",
	lineHeight: "38px",
	height: "40px",
	letterSpacing: "0.04em",
	fontStyle: "italic",
	fontWeight: "bold",
	textDecoration: "none",
})

type TagsProps = {
	tags: TagsFragment[]
}

export function Tags({ tags }: TagsProps) {
	const [showAll, setShowAll] = useState(tags.length <= 5)
	const elementsShown = showAll ? tags.length : 5
	const slicedElements = tags.slice(0, elementsShown)
	return (
		<HStack gap={2} flexWrap={"wrap"}>
			{slicedElements?.map((tag) => {
				return (
					<Link
						className={css(
							{
								_hover: {
									textDecoration: "underline",
								},
							},
							tagStyles,
						)}
						to={$path("/search", { query: tag.text })}
						key={tag.id}
					>
						#{tag.text}
					</Link>
				)
			})}
			{!showAll && (
				<button
					type="button"
					className={css({ cursor: "pointer", border: "none" }, tagStyles)}
					onClick={() => setShowAll(true)}
				>
					...
				</button>
			)}
		</HStack>
	)
}
