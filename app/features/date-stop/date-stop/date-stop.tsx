import { DateStopItemFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FaExternalLinkAlt } from "react-icons/fa/index.js"

type Props = {
	stop: DateStopItemFragment
}

export function DateStop({ stop }: Props) {
	return (
		<VStack gap={2} alignItems={"flex-start"}>
			<VStack gap={1} alignItems={"flex-start"}>
				<h3
					className={css({
						fontSize: { base: "20px", md: "20px" },
						fontWeight: "bold",
					})}
				>
					{stop.order}. {stop.title}
				</h3>
				{stop.location.website ? (
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
							href={stop.location.website}
							target="_blank"
							rel="noreferrer noopener external nofollow"
						>
							{stop.location.name}
						</a>
					</div>
				) : (
					<div
						className={css({ display: "flex", gap: 1, alignItems: "center" })}
					>
						<span className={css({ textStyle: "paragraph" })}>
							{stop.location.name}
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
				{stop.content}
			</p>
		</VStack>
	)
}
