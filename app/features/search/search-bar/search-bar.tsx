import { Form, useLocation, useSearchParams } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { FaSlidersH } from "react-icons/fa/index.js"
import { FiSearch } from "react-icons/fi/index.js"
import { $path } from "remix-routes"
import { CityCombobox } from "~/features/city"
import { CheckboxGroup, RadioGroup } from "~/features/ui"
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

export function SearchBar() {
	const [isVisible, setIsVisible] = useState<"yes" | "no">("no")
	const formRef = useRef<HTMLFormElement>(null)
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()
	const timesOfDay = searchParams.getAll("timesOfDay")
	const nsfw = searchParams.get("nsfw")
	const cities = searchParams.getAll("cities")
	// we reuse this component on the search page so we want
	// to keep the value of the search bar if we are on the search page
	useEffect(() => {
		if (!pathname.includes("/search")) {
			formRef.current?.reset()
		}
	}, [pathname])

	return (
		<Form
			ref={formRef}
			method="get"
			action={$path("/search")}
			className={css({
				width: "100%",
			})}
		>
			<div className={css({ width: "100%" })}>
				<div
					className={css({
						display: "flex",
						border: "1px solid",
						borderColor: "gray",
						borderRadius: "50px",
						padding: "8px 12px",
						width: "100%",
						shadow: "sm",
					})}
				>
					<HStack gap={4} flex={1} alignItems="center">
						<input
							type="search"
							className={css({
								padding: "8px",
								width: "100%",
								border: "none",
								outline: "none",
								flex: "1 1 0%",
							})}
							defaultValue={searchParams.get("query") ?? ""}
							placeholder="Search for any kind of date..."
							name="query"
						/>
						<div
							className={css({
								width: "1px",
								minHeight: "100%",
								backgroundColor: "gray",
							})}
						/>
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
								<p
									className={css({
										fontWeight: "bold",
										textStyle: "paragraph",
										display: { base: "none", md: "block" },
									})}
								>
									Filters
								</p>
							</HStack>
						</button>
						<button
							type="submit"
							className={css({
								backgroundColor: "primary",
								border: 0,
								outline: 0,
								cursor: "pointer",
								borderRadius: "50px",
								color: "white",
								padding: "8px 16px",
								fontWeight: "bold",
								display: { base: "none", md: "block" },
							})}
						>
							<HStack gap={1} alignItems="center">
								<FiSearch /> <span>Search</span>
							</HStack>
						</button>
					</HStack>
				</div>
				<HStack
					gap={{ base: 4, lg: 8 }}
					paddingBlock={6}
					flexWrap={"wrap"}
					alignItems={"flex-start"}
					className={visible({ visible: isVisible })}
				>
					<CityCombobox label="Find dates in" defaultCities={cities ?? []} />
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
					<CheckboxGroup
						label="Times of day"
						name="timesOfDay"
						options={[
							{
								label: "Morning",
								value: "morning",
								defaultChecked:
									timesOfDay.length > 0 ? timesOfDay.includes("morning") : true,
							},
							{
								label: "Afternoon",
								value: "afternoon",
								defaultChecked:
									timesOfDay.length > 0
										? timesOfDay.includes("afternoon")
										: true,
							},
							{
								label: "Evening",
								value: "evening",
								defaultChecked:
									timesOfDay.length > 0 ? timesOfDay.includes("evening") : true,
							},
							{
								label: "Late Night",
								value: "late night",
								defaultChecked:
									timesOfDay.length > 0
										? timesOfDay.includes("late night")
										: false,
							},
						]}
					/>
				</HStack>
			</div>
		</Form>
	)
}
