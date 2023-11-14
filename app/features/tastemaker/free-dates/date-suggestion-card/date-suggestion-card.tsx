import { singularOrPlural } from "~/lib"
import { match } from "ts-pattern"
import { DateSuggestionCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	suggestion: DateSuggestionCardFragment
}

export function DateSuggestionCard({ suggestion }: Props) {
	return (
		<div
			className={css({
				backgroundColor: "white",
				borderRadius: "8px",
				border: "1px solid",
				borderColor: "gray",
				padding: "8px",
			})}
		>
			<VStack gap={4} alignItems="flex-start">
				<VStack gap={1} alignItems="flex-start">
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						Idea
					</p>
					<p className={css({ textStyle: "paragraph" })}>{suggestion.text}</p>
				</VStack>
				<VStack gap={1} alignItems={"flex-start"}>
					<p className={css({ textStyle: "paragraph", fontWeight: "bold" })}>
						{singularOrPlural(suggestion.cities.length, "City", "Cities")}
					</p>
					{match(suggestion.cities)
						.when(
							({ length }) => length === 0,
							() => (
								<p className={css({ textStyle: "paragraph" })}>
									Any cities you want
								</p>
							),
						)
						.when(
							({ length }) => length > 0,
							(cities) =>
								cities.map((city) => (
									<div key={city.id}>{city.nameAndState}</div>
								)),
						)
						.run()}
				</VStack>
			</VStack>
		</div>
	)
}
