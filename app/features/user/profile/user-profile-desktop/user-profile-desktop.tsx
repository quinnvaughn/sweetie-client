import { UserProfileLeftSide } from "../user-profile-left-side"
import { FreeDateList } from "~/features/free-date"
import { UserProfileFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	user: UserProfileFragment
}

export function UserProfileDesktop({ user }: Props) {
	return (
		<HStack gap={8} alignItems="flex-start">
			<UserProfileLeftSide user={user} />
			{user.tastemaker && (
				<div className={css({ flexBasis: `${(7 / 12) * 100}%` })}>
					<FreeDateList
						noDatesText="Hasn't added any dates yet."
						freeDates={user.tastemaker.freeDates}
						xl={{ gridTemplateColumns: "repeat(2, 1fr)" }}
					/>
				</div>
			)}
		</HStack>
	)
}
