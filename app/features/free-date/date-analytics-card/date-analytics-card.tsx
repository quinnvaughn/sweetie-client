import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { Image } from "~/features/ui"
import { DateAnalyticsCardFragment } from "~/graphql/generated"
import { singularOrPlural } from "~/lib"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	date: DateAnalyticsCardFragment
}

export function DateAnalyticsCard({ date }: Props) {
	return (
		<Link to={$path("/free-date/:id", { id: date.id })} target="_blank">
			<VStack gap={4} alignItems="flex-start">
				<Image
					alt={"analytics card thumbnail"}
					css={{
						borderRadius: "8px",
						aspectRatio: "20/19",
						width: "100%",
						objectFit: "cover",
					}}
					src={date.thumbnail}
				/>
				<VStack gap={2} alignItems="flex-start">
					<span className={css({ textStyle: "paragraph", fontWeight: "600" })}>
						{date.title}
					</span>
					<HStack gap={2} alignItems="flex-start">
						<span>
							<span className={css({ fontWeight: "bold" })}>
								{date.views?.viewCount || 0}
							</span>{" "}
							{singularOrPlural(date.views?.viewCount || 0, "view", "views")}
						</span>
						<span>
							<span className={css({ fontWeight: "bold" })}>
								{date.numPlannedDates}
							</span>{" "}
							planned dates
						</span>
					</HStack>
				</VStack>
			</VStack>
		</Link>
	)
}
