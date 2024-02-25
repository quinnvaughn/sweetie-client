import { DateTime } from "luxon"
import { FaExternalLinkAlt } from "react-icons/fa/index.js"
import { TravelTime } from "~/features/date-stop"
import { Image } from "~/features/ui"
import { EventOrderedStopFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	orderedStop: EventOrderedStopFragment
}

export function EventOrderedStop({
	orderedStop: { order, location, description, travel, formattedEstimatedTime },
}: Props) {
	return (
		<VStack gap={{ base: 4, md: 3 }} alignItems={"flex-start"} width={"100%"}>
			<VStack gap={{ base: 4, md: 3 }} alignItems={"flex-start"} width={"100%"}>
				<HStack gap={2} alignItems={"center"} flexWrap={"wrap"}>
					<h3
						className={css({
							fontSize: { base: "20px", md: "20px" },
							fontWeight: "bold",
						})}
					>
						{order}. {location.name}
					</h3>
					<span className={css({ color: "grayText", fontWeight: "normal" })}>
						{formattedEstimatedTime}
					</span>
				</HStack>
				{location.images.length > 0 && (
					<Image
						src={location.images[0]}
						alt={location.name}
						css={{
							width: "100%",
							aspectRatio: "16/9",
							objectFit: "cover",
							borderRadius: "8px",
							backgroundColor: "gray",
							maxHeight: "400px",
						}}
					/>
				)}
				{location.website ? (
					<div
						className={css({ display: "flex", gap: 1, alignItems: "center" })}
					>
						<FaExternalLinkAlt className={css({ color: "black" })} />
						<a
							className={css({
								textStyle: "paragraph",

								fontWeight: "bold",
								textDecoration: "underline",
							})}
							href={location.website}
							target="_blank"
							rel="noreferrer noopener external nofollow"
						>
							{location.name}
						</a>
					</div>
				) : (
					<div
						className={css({ display: "flex", gap: 1, alignItems: "center" })}
					>
						<span className={css({ textStyle: "paragraph" })}>
							{location.name}
						</span>
					</div>
				)}
			</VStack>
			<p
				className={css({
					textStyle: "paragraph",
					whiteSpace: "pre-line",
					wordBreak: "break-word",
				})}
			>
				{description}
			</p>
			{travel && <TravelTime travel={travel} />}
		</VStack>
	)
}
