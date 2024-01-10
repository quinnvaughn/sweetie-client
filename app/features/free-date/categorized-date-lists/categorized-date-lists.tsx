import { ListHeading } from "~/features/ui"
import { CategorizedDateListFragment } from "~/graphql/generated"
import { VStack } from "~/styled-system/jsx"
import { FreeDateList } from ".."

type Props = {
	categorizedDateLists: CategorizedDateListFragment[]
}

export function CategorizedDateLists({ categorizedDateLists }: Props) {
	return categorizedDateLists.map((categorizedList) => (
		<VStack
			gap={4}
			alignItems={"flex-start"}
			width={"100%"}
			key={categorizedList.id}
		>
			<ListHeading title={categorizedList.title} />
			<FreeDateList freeDates={categorizedList.dates} />
		</VStack>
	))
}
