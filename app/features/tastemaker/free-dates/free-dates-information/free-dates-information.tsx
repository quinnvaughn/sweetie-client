import { match } from "ts-pattern"
import { EditFreeDatesList } from "~/features/free-date"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	retired: boolean
	dates: FreeDateCardFragment[]
}

export function FreeDatesInformation({ retired, dates }: Props) {
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
				{retired ? "Retired" : "Created"} Dates
			</h1>
			<HStack
				gap={4}
				flexWrap="wrap"
				justifyContent={dates.length === 0 ? "center" : "flex-start"}
				alignItems="flex-start"
				width={"100%"}
			>
				{match([dates, retired])
					.when(
						([dates, retired]) => dates?.length === 0 && !retired,
						() => (
							<p className={css({ textStyle: "paragraph" })}>
								Press &quot;Create a new date&quot; to get started making a new
								date
							</p>
						),
					)
					.when(
						([dates, retired]) => dates?.length === 0 && retired,
						() => (
							<p className={css({ textStyle: "paragraph" })}>
								No retired dates.
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
