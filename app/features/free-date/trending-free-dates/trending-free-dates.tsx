import { MutableRefObject, forwardRef } from "react"
import { P, match } from "ts-pattern"
import { ListHeading } from "~/features/ui"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FreeDateList } from ".."

type Props = {
	freeDates: FreeDateCardFragment[]
}

type Ref = HTMLInputElement

const TrendingFreeDates = forwardRef<Ref, Props>(function TrendingFreeDates(
	{ freeDates },
	ref,
) {
	const myRef = ref as MutableRefObject<HTMLInputElement>

	return (
		<VStack gap={4} alignItems={"flex-start"} width={"100%"}>
			<ListHeading title="Trending Dates" />
			{match(freeDates)
				.with(P.nullish, () => (
					<p className={css({ textStyle: "paragraph" })}>
						No trending dates at this time.
					</p>
				))
				.when(
					(dates) => dates.length === 0,
					() => (
						<p className={css({ textStyle: "paragraph" })}>
							No trending dates at this time.
						</p>
					),
				)
				.when(
					(dates) => dates.length > 0,
					(dates) => (
						<VStack gap={6}>
							<FreeDateList freeDates={dates} />
							<p>
								Want to find more dates? Trying{" "}
								<button
									className={css({
										textStyle: "paragraph",
										color: "primary",
										backgroundColor: "transparent",
										border: "none",
										cursor: "pointer",
										"&:hover": {
											textDecoration: "underline",
										},
									})}
									type="button"
									onClick={() => myRef?.current?.focus()}
								>
									searching
								</button>
							</p>
						</VStack>
					),
				)
				.otherwise(() => null)}
		</VStack>
	)
})

export { TrendingFreeDates }
