import { DateExperienceCardFragment } from "~/graphql/generated"
import { Link } from "@remix-run/react"
import { css } from "~/styled-system/css"
import { $path } from "remix-routes"
import { HStack, VStack } from "~/styled-system/jsx"
import { numLines } from "~/styled-system/patterns"
import { UserAvatar } from "~/features/user"
import { NSFWTag } from ".."

type Props = {
	dateExperience: DateExperienceCardFragment
}

export function FreeDateCard({ dateExperience }: Props) {
	return (
		<Link
			className={css({
				display: "block",
				textDecoration: "none",
				_visited: { color: "inherit" },
			})}
			to={$path("/free-date/:id", { id: dateExperience.id })}
			target="_blank"
		>
			<VStack gap="4">
				<img
					src={dateExperience.thumbnail}
					alt={`${dateExperience.title} thumbnail`}
					className={css({
						aspectRatio: "20/19",
						objectFit: "cover",
						borderRadius: "8px",
						backgroundColor: "gray",
					})}
				/>
				<VStack gap="2" alignItems={"flex-start"}>
					<p className={css({ lineHeight: 1, fontWeight: "600" })}>
						{dateExperience.title}
					</p>
					{dateExperience.nsfw && <NSFWTag />}
					<p className={numLines({ color: "grayText", lines: 2 })}>
						{dateExperience.description}
					</p>
					<HStack gap={1} alignItems="center">
						<UserAvatar
							size={"sm"}
							user={{
								name: dateExperience.tastemaker.user.name,
								avatar: dateExperience.tastemaker.user.profile?.avatar,
							}}
						/>
						<p className={css({ color: "grayText" })}>
							{dateExperience.tastemaker.user.name}
						</p>
					</HStack>
					<p
						className={numLines({
							lines: 2,
							lineHeight: 1.2,
							whiteSpace: "pre-line",
							color: "grayText",
						})}
					>
						{dateExperience.cities.map((city) => city.nameAndState).join("\n")}
					</p>
				</VStack>
			</VStack>
		</Link>
	)
}
