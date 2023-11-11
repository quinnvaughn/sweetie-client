import { UserBioFragment } from "~/graphql/generated"
import { ProfileSection } from "../profile-section"
import { css } from "~/styled-system/css"

type Props = {
	user: UserBioFragment
}

export function UserBio({ user }: Props) {
	return (
		<ProfileSection heading="Bio">
			<p className={css({ textStyle: "paragraph", wordBreak: "break-word" })}>
				{user.profile?.bio || "No bio yet"}
			</p>
		</ProfileSection>
	)
}
