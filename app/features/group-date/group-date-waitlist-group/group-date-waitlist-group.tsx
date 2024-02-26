import { GroupDateWaitlistGroupFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { WaitlistGroupInfo } from "../waitlist-group-info"

type Props = {
	groupDateId: string
	waitlistGroup: GroupDateWaitlistGroupFragment
}

export function GroupDateWaitlistGroup(props: Props) {
	return (
		<VStack
			className={css({
				border: "1px solid",
				borderColor: "gray",
				borderRadius: "8px",
				padding: "16px",
				width: "100%",
			})}
		>
			<WaitlistGroupInfo {...props} />
		</VStack>
	)
}
