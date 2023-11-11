import { UserProfileLeftSideFragment } from "~/graphql/generated"
import { UserBio } from "../user-bio"
import { UserProfileHeading } from "../user-profile-heading"
import { VStack } from "~/styled-system/jsx"

type Props = {
	user: UserProfileLeftSideFragment
}

export function UserProfileLeftSide({ user }: Props) {
	return (
		<VStack
			position={"sticky"}
			top={"20px"}
			flexBasis={`${(5 / 12) * 100}%`}
			gap={8}
			alignItems="flex-start"
			justifyContent="flex-start"
		>
			<VStack
				alignItems="flex-start"
				justifyContent="flex-start"
				gap={4}
				border={"1px solid"}
				borderColor={"gray"}
				borderRadius={"8px"}
				width={"100%"}
				padding={"30px"}
			>
				<UserProfileHeading user={user} />
			</VStack>
			<VStack
				alignItems="flex-start"
				justifyContent="flex-start"
				gap={4}
				width={"100%"}
				border={"1px solid"}
				borderColor={"gray"}
				borderRadius={"8px"}
				padding={"30px"}
			>
				<UserBio user={user} />
			</VStack>
		</VStack>
	)
}
