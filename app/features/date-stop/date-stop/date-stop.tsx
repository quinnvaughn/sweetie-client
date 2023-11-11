import { DateStopItemFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { DateStopMap } from ".."
import { ClientOnly } from "remix-utils/client-only"
import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { FaCity, FaLocationDot } from "react-icons/fa6/index.js"
import { FaExternalLinkAlt } from "react-icons/fa/index.js"

type Props = {
	stop: DateStopItemFragment
}

export function DateStop({ stop }: Props) {
	return (
		<VStack gap={2} alignItems={"flex-start"}>
			<h3
				className={css({
					fontSize: { base: "20px", md: "20px" },
					fontWeight: "bold",
				})}
			>
				{stop.order}. {stop.title}
			</h3>
			<Link
				className={css({
					textDecoration: "underline",
					textStyle: "paragraph",
					fontWeight: "bold",
				})}
				to={$path("/search", { city: stop.location.address.city.name })}
			>
				<div className={css({ display: "flex", gap: 1, alignItems: "center" })}>
					<FaCity className={css({ color: "black" })} />
					<span>{stop.location.address.city.name}</span>
				</div>
			</Link>
			<ClientOnly>
				{() => <DateStopMap coordinates={stop.location.address.coordinates} />}
			</ClientOnly>
			{/** If the location doesn't have a url we still need to show something. */}
			{stop.location.website ? (
				<div className={css({ display: "flex", gap: 1, alignItems: "center" })}>
					<a
						className={css({
							textStyle: "paragraph",

							fontWeight: "bold",
							textDecoration: "underline",
						})}
						href={stop.location.website}
					>
						{stop.location.name}
					</a>
					<FaExternalLinkAlt className={css({ color: "black" })} />
				</div>
			) : (
				<div className={css({ display: "flex", gap: 1, alignItems: "center" })}>
					<span className={css({ textStyle: "paragraph" })}>
						{stop.location.name}
					</span>
				</div>
			)}
			<p
				className={css({
					textStyle: "paragraph",
					whiteSpace: "pre-line",
					wordBreak: "break-word",
				})}
			>
				{stop.content}
			</p>
		</VStack>
	)
}
