import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { PlannedDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { PlannedDateList } from ".."

type Props = {
	title: "upcoming" | "previous"
	plannedDates: PlannedDateCardFragment[]
}

export function PlannedDateSection({ title, plannedDates }: Props) {
	return (
		<VStack gap={2} alignItems={"flex-start"}>
			<h2
				className={css({
					textStyle: "h2",
					fontWeight: "500",
					fontSize: { base: "20px", md: "24px" },
				})}
			>
				{title === "upcoming" ? "Upcoming Dates" : "Previous Dates"}
			</h2>
			{plannedDates.length > 0 ? (
				<PlannedDateList plannedDates={plannedDates} />
			) : (
				<p>
					No {title} dates.{" "}
					{title === "upcoming" && (
						<span>
							Why not make some{" "}
							<Link
								to={$path("/")}
								className={css({
									color: "primary",
									textDecoration: "underline",
								})}
							>
								memories
							</Link>
							?
						</span>
					)}
				</p>
			)}
		</VStack>
	)
}
