import { ListHeading } from "~/features/ui"
import { match } from "ts-pattern"
import { DateExperienceCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FreeDateList } from ".."

type Props = {
	dateExperiences: DateExperienceCardFragment[]
}

export function TrendingFreeDates({ dateExperiences }: Props) {
	return (
		<VStack gap={4} alignItems={"flex-start"}>
			<ListHeading title="Trending Dates" />
			{match(dateExperiences)
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
					(dates) => <FreeDateList dateExperiences={dates} />,
				)
				.otherwise(() => null)}
		</VStack>
	)
}
