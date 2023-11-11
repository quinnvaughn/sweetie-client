import { VStack } from "~/styled-system/jsx"
import { UserBio } from "../user-bio"
import { UserProfileHeading } from "../user-profile-heading"
import { UserProfileFragment } from "~/graphql/generated"
import { FreeDateList } from "~/features/free-date"
import { css } from "~/styled-system/css"

type Props = {
	user: UserProfileFragment
}

export function UserProfileMobile({ user }: Props) {
	return (
		<VStack gap={2} width="100%">
			<div
				className={css({
					paddingBottom: "16px",
					borderBottom: "1px solid",
					borderBottomColor: "gray",
					width: "100%",
				})}
			>
				<UserProfileHeading user={user} />
			</div>
			<UserBio user={user} />
			{user.tastemaker && (
				<FreeDateList
					noDatesText="Hasn't added any dates yet."
					freeDates={user.tastemaker.experiences}
				/>
			)}
		</VStack>
	)
}
