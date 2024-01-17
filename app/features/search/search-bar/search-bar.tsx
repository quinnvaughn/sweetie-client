import { useSearchParams } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { forwardRef, useState } from "react"
import { FaSlidersH } from "react-icons/fa/index.js"
import { FiSearch } from "react-icons/fi/index.js"
import { $path } from "remix-routes"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { MultipleCityCombobox } from "~/features/city"
import { Desktop, RadioGroup } from "~/features/ui"
import { useInterval } from "~/hooks"
import { css, cva } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

const visible = cva({
	base: {
		opacity: 0,
		height: 0,
		visibility: "hidden",
		transition: "opacity 0.3s ease-in-out",
	},
	variants: {
		visible: {
			yes: {
				opacity: 1,
				height: "auto",
				visibility: "visible",
			},
			no: {
				opacity: 0,
				height: 0,
				visibility: "hidden",
			},
		},
	},
})

const validator = withZod(
	z.object({
		query: z.string().optional(),
		cities: z.array(z.string()).optional().or(z.string().optional()),
		nsfw: z.union([z.literal("on"), z.literal("off")], {
			required_error: "NSFW is required.",
		}),
	}),
)

type Ref = HTMLInputElement

// different kinds of dates
const suggestions = [
	"beach",
	"dancing",
	"drinks",
	"music",
	"hiking",
	"picnic",
	"themed",
	"movie",
	"upscale",
	"museum",
]

const SearchBar = forwardRef<Ref>(function SearchBar(_p, ref) {
	const [isVisible, setIsVisible] = useState<"yes" | "no">("no")
	const [searchParams] = useSearchParams()
	const nsfw = searchParams.get("nsfw")
	const cities = searchParams.getAll("cities")
	const [suggestion, setSuggestion] = useState<string>(
		suggestions[Math.floor(Math.random() * suggestions.length)],
	)

	useInterval(() => {
		const idx = suggestions.indexOf(suggestion)
		const nextSuggestion =
			idx === suggestions.length - 1 ? suggestions[0] : suggestions[idx + 1]
		setSuggestion(nextSuggestion)
	}, 3000)

	return (
		<ValidatedForm
			validator={validator}
			method="get"
			action={$path("/search")}
			className={css({
				width: "100%",
			})}
		>
			<div
				className={css({
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				})}
			>
				<div
					className={css({
						display: "flex",
						border: "1px solid",
						borderColor: "gray",
						borderRadius: "50px",
						padding: "8px 12px",
						width: { base: "100%", md: "75%" },
						shadow: "sm",
					})}
				>
					<HStack gap={4} flex={1} alignItems="center">
						<input
							ref={ref}
							type="search"
							autoCapitalize="off"
							className={css({
								padding: "8px",
								width: "100%",
								border: "none",
								outline: "none",
								flex: "1 1 0%",
								background: "white",
							})}
							defaultValue={searchParams.get("query") ?? ""}
							placeholder={`Search for ${suggestion} dates`}
							name="query"
						/>
						<Desktop>
							<div
								className={css({
									width: "1px",
									minHeight: "100%",
									backgroundColor: "gray",
								})}
							/>
						</Desktop>
						<button
							type="button"
							className={css({
								outline: "0",
								cursor: "pointer",
								padding: "8px",
								border: "1px solid",
								borderColor: "gray",
								borderRadius: { base: "50%", md: "8px" },
							})}
							onClick={() =>
								setIsVisible((prev) => (prev === "yes" ? "no" : "yes"))
							}
						>
							<HStack gap={1} alignItems="center">
								<FaSlidersH size={20} className={css({ color: "black" })} />
								<Desktop>
									<p
										className={css({
											fontWeight: "bold",
											textStyle: "paragraph",
										})}
									>
										Filters
									</p>
								</Desktop>
							</HStack>
						</button>
						<button
							type="submit"
							className={css({
								backgroundColor: "primary",
								border: 0,
								outline: 0,
								cursor: "pointer",
								borderRadius: { base: "50%", md: "9999999999px" },
								color: "white",
								padding: { base: "8px", md: "8px 16px" },
								fontWeight: "bold",
							})}
						>
							<HStack gap={{ base: 0, md: 1 }} alignItems="center">
								<FiSearch />{" "}
								<Desktop>
									<span>Search</span>
								</Desktop>
							</HStack>
						</button>
					</HStack>
				</div>
				<HStack
					gap={{
						base: isVisible === "yes" ? 4 : 0,
						lg: isVisible === "yes" ? 8 : 0,
					}}
					paddingBlock={isVisible === "yes" ? 6 : 0}
					flexWrap={"wrap"}
					alignItems={"flex-start"}
					className={visible({ visible: isVisible })}
				>
					<MultipleCityCombobox
						label="Find dates in"
						defaultCities={cities ?? []}
					/>
					<RadioGroup
						label="NSFW Filter"
						name="nsfw"
						options={[
							{
								label: "On",
								value: "on",
								defaultChecked: nsfw === "on",
							},
							{
								label: "Off",
								value: "off",
								defaultChecked:
									nsfw === "off" || nsfw === null || nsfw === undefined
										? true
										: false,
							},
						]}
					/>
				</HStack>
			</div>
		</ValidatedForm>
	)
})

export { SearchBar }
