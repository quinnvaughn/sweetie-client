import { P, match } from "ts-pattern"
import { ListHeading } from "~/features/ui"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FreeDateList } from ".."

type Props = {
	freeDates: FreeDateCardFragment[]
}

export function TrendingFreeDates({ freeDates }: Props) {
	return (
		<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
			<ListHeading title="Trending Dates" />
			{match(freeDates)
				.with(P.nullish, () => (
					<p className={css({ textStyle: "paragraph" })}>
						No trending dates at this time.
					</p>
				))
				.when(
					(dates) => dates.length === 0,
					() => (
						<p className={css({ textStyle: "paragraph" })}>
							No trending dates at this time.
						</p>
					),
				)
				.when(
					(dates) => dates.length > 0,
					(dates) => <FreeDateList freeDates={dates} />,
				)
				.otherwise(() => null)}
		</VStack>
	)
}
