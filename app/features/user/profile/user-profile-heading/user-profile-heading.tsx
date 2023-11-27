import { VStack } from "~/styled-system/jsx"
import { UserAvatar } from "../../avatar"
import { UserProfileHeadingFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { Link } from "@remix-run/react"
import { FaExternalLinkAlt } from "react-icons/fa/index.js"

type Props = {
	user: UserProfileHeadingFragment
}

export function UserProfileHeading({ user }: Props) {
	return (
		<VStack gap={4}>
			<VStack gap={1} alignItems={{ base: "center", md: "flex-start" }}>
				<UserAvatar
					size={"2xl"}
					user={{
						name: user.name,
						avatar: user.profile?.avatar,
					}}
				/>
				<h1
					className={css({
						textStyle: "h1",
						fontSize: "20px",
						lineHeight: "1.25",
					})}
				>
					{user.name}
				</h1>
				<p className={css({ textStyle: "paragraph", color: "grayText" })}>
					@{user.username}
				</p>
				{user.profile?.link && (
					<a
						className={css({ color: "secondary", fontWeight: "bold" })}
						href={user.profile.link}
						rel="noopener noreferrer nofollow"
					>
						<div
							className={css({ display: "flex", gap: 1, alignItems: "center" })}
						>
							{user.profile.link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
							<FaExternalLinkAlt className={css({ color: "secondary" })} />
						</div>
					</a>
				)}
			</VStack>
		</VStack>
	)
}
