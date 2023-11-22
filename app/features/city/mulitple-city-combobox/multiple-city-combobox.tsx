import { useCombobox, useMultipleSelection } from "downshift"
import { useEffect, useState } from "react"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import { City } from "~/graphql/generated"
import { useCustomFetcher } from "~/hooks"
import { loader } from "~/routes/api.cities"
import { css, cva } from "~/styled-system/css"
import { IoCloseOutline } from "react-icons/io5/index.js"

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

export function MultipleCityCombobox({ label, defaultCities }: Props) {
	const [inputValue, setInputValue] = useState("")
	const fetcher = useCustomFetcher<typeof loader>()
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

	const { isOpen, getLabelProps, getInputProps, getMenuProps, getItemProps } =
		useCombobox<NewCity>({
			id: "multiple-city-combobox",
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
								fetcher.reset()
								setInputValue("")
							}
						},
					)
					.with(useCombobox.stateChangeTypes.InputChange, () => {
						setInputValue(newInputValue ?? "")
						if (newInputValue?.length === 0) {
							fetcher.reset()
						}
					})
					.otherwise(() => {})
			},
		})

	return (
		<div
			className={css({
				width: { base: "100%", md: "400px" },
				position: "relative",
			})}
		>
			<div
				className={css({ display: "flex", flexDirection: "column", gap: 1 })}
			>
				<label className={css({ width: "fit-content" })} {...getLabelProps()}>
					{label}
				</label>
				<div
					className={css({
						shadow: "sm",
						bg: "white",
						display: "inline-flex",
						gap: 2,
						alignItems: "center",
						flexWrap: "wrap",
						padding: "8px",
						borderRadius: "8px",
						border: "1px solid",
						borderColor: "gray",
					})}
				>
					{selectedCities.map((selectedCity, index) => (
						<span
							className={css({
								bg: "secondary",
								borderRadius: "8px",
								paddingX: 1,
								color: "white",
								display: "flex",
								alignItems: "center",
							})}
							key={`selected-item-${index}`}
							{...getSelectedItemProps({
								selectedItem: selectedCity,
								index,
							})}
						>
							{selectedCity}
							<button
								type="button"
								className={css({ paddingX: 1, cursor: "pointer" })}
								onClick={(e) => {
									e.stopPropagation()
									removeSelectedItem(selectedCity)
								}}
							>
								<IoCloseOutline size={20} className={css({ color: "white" })} />
							</button>
						</span>
					))}
					<div className={css({ display: "flex", gap: 0.5, flexGrow: 1 })}>
						<input
							placeholder="Enter a city"
							className={css({ width: "100%", outline: "none" })}
							{...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
							value={inputValue}
						/>
						{selectedCities.length > 0 &&
							selectedCities.map((c) => (
								<input key={c} type="hidden" name="cities" value={c} />
							))}
					</div>
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
								paddingY: 2,
								paddingX: 3,
								cursor: "pointer",
								"&:hover": { bg: "gray" },
							})}
							key={`${city}${index}`}
							{...getItemProps({ item: city, index })}
						>
							<span>{city.nameAndState}</span>
						</li>
					))}
			</ul>
		</div>
	)
}
