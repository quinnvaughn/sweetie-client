import { Link } from "@remix-run/react"
import { DateTime } from "luxon"
import { Image } from "~/features/ui"
import { UserAvatar } from "~/features/user"
import { EventCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { numLines } from "~/styled-system/patterns"

type Props = {
	event: EventCardFragment
}

export function EventCard({ event }: Props) {
	return (
		<Link to={`/event/${event.id}`} target="_blank">
			<VStack gap="4" width={"100%"} alignItems="flex-start">
				<div className={css({ position: "relative", width: "100%" })}>
					<Image
						loading={"eager"}
						src={event.image}
						alt={`${event.title} thumbnail`}
						css={{
							aspectRatio: "20/19",
							objectFit: "cover",
							borderRadius: "8px",
							backgroundColor: "gray",
							width: "100%",
						}}
					/>
					<VStack
						gap={0}
						className={css({
							position: "absolute",
							top: "10px",
							left: "10px",
							backgroundColor: "rgba(0, 0, 0, 0.7)",
							color: "white",
							padding: "4px 8px",
							borderRadius: "8px",
						})}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<span
							className={css({
								fontFamily: "roboto",
								textTransform: "uppercase",
								fontWeight: "bold",
							})}
						>
							TBD
						</span>
					</VStack>
				</div>
				<VStack gap={1.5} alignItems={"flex-start"} width={"100%"}>
					<p className={css({ lineHeight: 1, fontWeight: "600" })}>
						{event.title}
					</p>
					<p className={numLines({ color: "grayText", lines: 2 })}>
						{event.description}
					</p>
					<div
						className={css({
							fontSize: "16px",
							fontWeight: "bold",
							padding: "8px 16px",
							borderRadius: "8px",
							backgroundColor: "secondary",
							color: "white",
							cursor: "pointer",
							width: "100%",
							textAlign: "center",
						})}
					>
						Sign up for the waitlist
					</div>
					<HStack gap={1} alignItems="center">
						<UserAvatar
							size={"sm"}
							user={{
								name: event.tastemaker.user.name,
								avatar: event.tastemaker.user.profile?.avatar,
							}}
						/>
						<p className={css({ color: "grayText" })}>
							{event.tastemaker.user.name}
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
						{event.cities.map((city) => city.nameAndState).join("\n")}
					</p>
				</VStack>
			</VStack>
		</Link>
	)
}
