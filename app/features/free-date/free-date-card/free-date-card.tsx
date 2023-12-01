import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { Image } from "~/features/ui"
import { UserAvatar } from "~/features/user"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { numLines } from "~/styled-system/patterns"
import { NSFWTag } from ".."

type Props = {
	date: FreeDateCardFragment
	loading?: "lazy" | "eager"
}

export function FreeDateCard({ date, loading = 'eager'}: Props) {
	return (
		<Link
			className={css({
				display: "block",
				textDecoration: "none",
				width: "100%",
				_visited: { color: "inherit" },
			})}
			to={$path("/free-date/:id", { id: date.id })}
			target="_blank"
			prefetch="intent"
		>
			<VStack gap="4" width={"100%"} alignItems="flex-start">
				<Image
					loading={loading}
					src={date.thumbnail}
					alt={`${date.title} thumbnail`}
					css={{
						aspectRatio: "20/19",
						objectFit: "cover",
						borderRadius: "8px",
						backgroundColor: "gray",
						width: "100%",
					}}
				/>
				<VStack gap="2" alignItems={"flex-start"} width={"100%"}>
					<p className={css({ lineHeight: 1, fontWeight: "600" })}>
						{date.title}
					</p>
					{date.nsfw && <NSFWTag />}
					<p className={numLines({ color: "grayText", lines: 2 })}>
						{date.description}
					</p>
					<HStack gap={1} alignItems="center">
						<UserAvatar
							size={"sm"}
							user={{
								name: date.tastemaker.user.name,
								avatar: date.tastemaker.user.profile?.avatar,
							}}
						/>
						<p className={css({ color: "grayText" })}>
							{date.tastemaker.user.name}
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
						{date.cities.map((city) => city.nameAndState).join("\n")}
					</p>
				</VStack>
			</VStack>
		</Link>
	)
}
