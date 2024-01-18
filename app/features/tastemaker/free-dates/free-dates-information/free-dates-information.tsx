import { match } from "ts-pattern"
import { EditFreeDatesList } from "~/features/free-date"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	archived: boolean
	dates: FreeDateCardFragment[]
}

export function FreeDatesInformation({ archived, dates }: Props) {
	return (
		<VStack
			gap={4}
			justifyContent={"flex-start"}
			alignItems="flex-start"
			width={"100%"}
		>
			<h1
				className={css({
					textStyle: "h1",
					fontSize: { base: "24px", md: "32px" },
				})}
			>
				{archived ? "Archived" : "Created"} Dates
			</h1>
			<HStack
				gap={4}
				flexWrap="wrap"
				justifyContent={dates.length === 0 ? "center" : "flex-start"}
				alignItems="flex-start"
				width={"100%"}
			>
				{match([dates, archived])
					.when(
						([dates, archived]) => dates?.length === 0 && !archived,
						() => (
							<p className={css({ textStyle: "paragraph" })}>
								Press &quot;Create a new date&quot; to get started making a new
								date
							</p>
						),
					)
					.when(
						([dates, archived]) => dates?.length === 0 && archived,
						() => (
							<p className={css({ textStyle: "paragraph" })}>
								No archived dates.
							</p>
						),
					)
					.when(
						([dates]) => dates?.length && dates.length > 0,
						([dates]) => <EditFreeDatesList dates={dates} />,
					)
					.otherwise(() => null)}
			</HStack>
		</VStack>
	)
}
