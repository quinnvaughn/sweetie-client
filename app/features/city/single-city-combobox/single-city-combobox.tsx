import { useCombobox } from "downshift"
import { useState } from "react"
import { $path } from "remix-routes"
import { useField } from "remix-validated-form"
import { City } from "~/graphql/generated"
import { useCustomFetcher } from "~/hooks"
import { loader } from "~/routes/api.cities"
import { css, cva } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

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

type Props = {
	label: string
	required?: boolean
	fields: {
		text: string
		city: string
		state: string
	}
}

export function SingleCityCombobox({ label, required, fields }: Props) {
	const fetcher = useCustomFetcher<typeof loader>()
	const {
		error,
		getInputProps: getFieldProps,
		clearError,
	} = useField(fields.text)
	const { error: nameError } = useField(fields.city)
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	)
	const [selectedState, setSelectedState] = useState<string | undefined>(
		undefined,
	)
	const cities = fetcher.data?.cities ?? []
	type NewCity = Pick<City, "nameAndState">

	const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
		useCombobox<NewCity>({
			id: "single-city-combobox",
			items: cities,
			itemToString: (city) => city?.nameAndState ?? "",
			onSelectedItemChange({ selectedItem }) {
				setSelectedCity(selectedItem?.nameAndState.split(",")[0].trim())
				setSelectedState(selectedItem?.nameAndState.split(",")[1].trim())
				clearError()
			},
			onInputValueChange({ inputValue }) {
				if (inputValue?.length === 0) {
					fetcher.reset()
				}
				if (inputValue && inputValue.length > 0) {
					fetcher.submit(
						{
							text: inputValue,
						},
						{ method: "GET", action: $path("/api/cities") },
					)
				}
			},
			defaultHighlightedIndex: 0,
		})

	return (
		<div
			className={css({
				width: "100%",
				position: "relative",
			})}
		>
			<div
				className={css({ display: "flex", flexDirection: "column", gap: 1 })}
			>
				<label className={css({ width: "fit-content" })} {...getLabelProps()}>
					{label}{" "}
					{required && <span className={css({ textStyle: "error" })}>*</span>}
				</label>
				<div
					className={css({
						shadow: "sm",
						bg: "white",
						display: "flex",
						gap: 2,
						alignItems: "center",
						flexWrap: "wrap",
						padding: "8px",
						borderRadius: "8px",
						border: "1px solid",
						borderColor: "gray",
					})}
				>
					<input
						placeholder="City"
						className={css({ width: "100%", outline: "none" })}
						{...getFieldProps({
							...getInputProps(),
						})}
					/>
					<input type="hidden" name={fields.city} value={selectedCity ?? ""} />
					<input
						type="hidden"
						name={fields.state}
						value={selectedState ?? ""}
					/>
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
								"&:hover": { bg: "#EEEEEE" },
							})}
							key={`${location}${index}`}
							{...getItemProps({ item: city, index })}
						>
							<VStack gap={1} alignItems="flex-start" width="100%">
								<span className={css({ fontWeight: "bold" })}>
									{city.nameAndState}
								</span>
							</VStack>
						</li>
					))}
			</ul>
			{error ? (
				<p className={css({ textStyle: "error" })}>{error}</p>
			) : nameError ? (
				<p className={css({ textStyle: "error" })}>{nameError}</p>
			) : null}
		</div>
	)
}
