import { ListHeading } from "~/features/ui"
import { GroupDateCardFragment } from "~/graphql/generated"
import { VStack } from "~/styled-system/jsx"
import { GroupDateList } from "../group-date-list"

type Props = {
	groupDateList: GroupDateCardFragment[]
}

export function UpcomingGroupDateList({ groupDateList }: Props) {
	return (
		<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
			<ListHeading
				title={"Upcoming Group Date Nights"}
				description={
					"It was a million tiny little things that, when you added them all up, they meant we were supposed to be together."
				}
			/>
			<GroupDateList groupDates={groupDateList} />
		</VStack>
	)
}
