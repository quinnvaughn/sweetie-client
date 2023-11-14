import { match } from "ts-pattern"
import { DateSuggestionCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"
import { DateSuggestionCard } from "../date-suggestion-card"

type Props = {
	suggestions: DateSuggestionCardFragment[]
}

export function DateSuggestionList({ suggestions }: Props) {
	return match(suggestions)
		.when(
			(suggestions) => suggestions.length === 0,
			() => (
				<HStack justifyContent="center" width={"100%"}>
					<img
						alt="No suggestions yet"
						src="https://media.giphy.com/media/3orif5NUjcfHZLfZZK/giphy.gif"
					/>
				</HStack>
			),
		)
		.when(
			(suggestions) => suggestions.length > 0,
			() => (
				<div
					className={css({
						display: "grid",
						gap: 2,
						gridTemplateColumns: {
							base: "repeat(1fr)",
							md: "repeat(2, 1fr)",
							lg: "repeat(3, 1fr)",
						},
					})}
				>
					{suggestions.map((suggestion) => (
						<DateSuggestionCard key={suggestion.id} suggestion={suggestion} />
					))}
				</div>
			),
		)
		.otherwise(() => null)
}
