import { useFetcher } from "@remix-run/react"
import { useCombobox, useMultipleSelection } from "downshift"
import { useEffect, useMemo, useState } from "react"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { City } from "~/graphql/generated"
import { loader } from "~/routes/api.cities"
import { css, cva } from "~/styled-system/css"

const menu = cva({
	base: {
		position: "absolute",
		zIndex: 10,
		bg: "white",
		boxShadow: "lg",
		borderRadius: "8px",
		border: "1px solid",
		borderColor: "gray",
		maxHeight: "180px",
		overflow: "scroll",
		width: "100%",
		mt: 1,
		p: 0,
	},
	variants: {
		hidden: {
			true: {
				opacity: 0,
				height: 0,
				visibility: "hidden",
			},
			false: {
				opacity: 1,
				height: "auto",
				visibility: "visible",
			},
		},
	},
})

type NewCity = Pick<City, "nameAndState">

type Props = {
	label: string
	defaultCities?: string[]
}

export function CityCombobox({ label, defaultCities }: Props) {
	const [inputValue, setInputValue] = useState("")
	const fetcher = useFetcher<typeof loader>()
	const [selectedCities, setSelectedCities] = useState<string[]>(
		defaultCities ?? [],
	)
	const cities = fetcher.data?.cities ?? []

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (inputValue.length > 0) {
			fetcher.submit(
				{
					text: inputValue,
					selected: selectedCities,
				},
				{ method: "GET", action: $path("/api/cities") },
			)
		}
	}, [inputValue, selectedCities])

	const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
		useMultipleSelection({
			selectedItems: selectedCities,
			defaultSelectedItems: defaultCities ?? [],
			onStateChange: ({ selectedItems: newSelectedItems, type }) => {
				match(type)
					.with(
						useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace,
						useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete,
						useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace,
						useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem,
						() => {
							setSelectedCities(newSelectedItems ?? [])
						},
					)
					.otherwise(() => {})
			},
		})

	const {
		isOpen,
		getLabelProps,
		getInputProps,
		getMenuProps,
		getItemProps,
		getToggleButtonProps,
	} = useCombobox<NewCity>({
		id: "city-combobox",
		items: cities,
		itemToString: (city) => city?.nameAndState ?? "",
		defaultHighlightedIndex: 0,
		selectedItem: null,
		onStateChange({
			inputValue: newInputValue,
			type,
			selectedItem: newSelectedItem,
		}) {
			match(type)
				.with(
					useCombobox.stateChangeTypes.InputKeyDownEnter,
					useCombobox.stateChangeTypes.ItemClick,
					useCombobox.stateChangeTypes.InputBlur,
					() => {
						if (newSelectedItem) {
							setSelectedCities([
								...selectedCities,
								newSelectedItem.nameAndState,
							])
							setInputValue("")
						}
					},
				)
				.with(useCombobox.stateChangeTypes.InputChange, () => {
					setInputValue(newInputValue ?? "")
				})
				.otherwise(() => {})
		},
	})

	const busy = fetcher.state !== "idle"

	return (
		<div
			className={css({
				gap: 1,
				display: "flex",
				flexDirection: "column",
				width: { base: "100%", md: "300px" },
			})}
		>
			<label {...getLabelProps()}>{label}</label>
			<div className={css({ position: "relative" })}>
				<div>
					{selectedCities.map((selectedCity, index) => (
						<span
							//  className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
							key={`selected-item-${index}`}
							{...getSelectedItemProps({
								selectedItem: selectedCity,
								index,
							})}
						>
							{selectedCity}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									removeSelectedItem(selectedCity)
								}}
							>
								&#10005;
							</button>
						</span>
					))}
					<div>
						<input
							className={css({
								width: "100%",
								border: "1px solid",
								borderColor: "gray",
								borderRadius: "8px",
								padding: "8px",
							})}
							{...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
						/>
						{selectedCities.map((c) => (
							<input type="hidden" name="cities" value={c} key={c} />
						))}
						<button
							aria-label="toggle menu"
							className="px-2"
							type="button"
							{...getToggleButtonProps()}
						>
							&#8595;
						</button>
						{/* <Spinner showSpinner={showSpinner} /> */}
					</div>
				</div>
				<ul
					className={menu({ hidden: !(isOpen && cities.length) })}
					{...getMenuProps()}
				>
					{isOpen &&
						cities.map((city, index) => (
							<li
								className={css({
									paddingY: 1,
									paddingX: 2,
									cursor: "pointer",
								})}
								key={city.id}
								{...getItemProps({ item: city, index })}
							>
								{city.nameAndState}
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}
