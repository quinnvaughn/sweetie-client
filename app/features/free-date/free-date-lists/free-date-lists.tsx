import { ListHeading } from "~/features/ui"
import { FreeDateListFragment } from "~/graphql/generated"
import { VStack } from "~/styled-system/jsx"
import { FreeDateList } from ".."

type Props = {
	freeDateLists: FreeDateListFragment[]
}

export function FreeDateLists({ freeDateLists }: Props) {
	return freeDateLists.map((freeDateList) => (
		<VStack
			gap={4}
			alignItems={"flex-start"}
			width={"100%"}
			key={freeDateList.id}
		>
			<ListHeading title={freeDateList.title} />
			<FreeDateList freeDates={freeDateList.dates} />
		</VStack>
	))
}
