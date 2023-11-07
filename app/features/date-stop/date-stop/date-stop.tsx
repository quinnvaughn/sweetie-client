import { DateStopItemFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { DateStopMap } from ".."
import { ClientOnly } from "remix-utils/client-only"

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
			<ClientOnly>
				{() => <DateStopMap coordinates={stop.location.address.coordinates} />}
			</ClientOnly>
			{/** If the location doesn't have a url we still need to show something. */}
			{stop.location.website ? (
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
			) : (
				<p className={css({ textStyle: "paragraph" })}>{stop.location.name}</p>
			)}
			{/* This is so we properly render \n as linebreaks. */}
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
