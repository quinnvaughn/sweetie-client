import { ListHeading } from "~/features/ui"
import { EventCardFragment } from "~/graphql/generated"
import { VStack } from "~/styled-system/jsx"
import { EventList } from "../event-list"

type Props = {
	eventList: EventCardFragment[]
}

export function UpcomingEventList({ eventList }: Props) {
	return (
		<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
			<ListHeading
				title={"Upcoming Date Night Events"}
				description={
					"It was a million tiny little things that, when you added them all up, they meant we were supposed to be together."
				}
			/>
			<EventList events={eventList} />
		</VStack>
	)
}
