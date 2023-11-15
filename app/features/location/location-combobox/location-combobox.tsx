import { useCombobox } from "downshift"
import { useState } from "react"
import { $path } from "remix-routes"
import { useField } from "remix-validated-form"
import { useCustomFetcher } from "~/hooks"
import { loader } from "~/routes/api.locations"
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
	fields: {
		name: string
		id: string
	}
}

export function LocationCombobox({ label, fields }: Props) {
	const fetcher = useCustomFetcher<typeof loader>()
	const [selectedLocation, setSelectedLocation] = useState<
		Location | undefined | null
	>(null)
	const {
		error,
		getInputProps: getFieldProps,
		clearError,
	} = useField(fields.name)
	const locations = fetcher.data?.locations ?? []
	type Location = typeof locations[number]

	const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
		useCombobox<Location>({
			id: "location-combobox",
			items: locations,
			itemToString: (location) => location?.name ?? "",
			onSelectedItemChange({ selectedItem }) {
				setSelectedLocation(selectedItem)
				clearError()
			},
			onInputValueChange({ inputValue }) {
				if (inputValue && inputValue.length > 0) {
					fetcher.submit(
						{
							text: inputValue,
						},
						{ method: "GET", action: $path("/api/locations") },
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
					<input
						placeholder="Search for a location/establishment"
						className={css({ width: "100%", outline: "none" })}
						{...getFieldProps({
							...getInputProps({
								id: fields.name,
								name: fields.name,
							}),
						})}
					/>
					<input
						type="hidden"
						name={fields.id}
						value={selectedLocation?.id ?? ""}
					/>
				</div>
			</div>
			<ul
				className={menu({ hidden: !(isOpen && locations.length) })}
				{...getMenuProps()}
			>
				{isOpen &&
					locations.map((location, index) => (
						<li
							className={css({
								paddingY: 2,
								paddingX: 3,
								cursor: "pointer",
								"&:hover": { bg: "gray" },
							})}
							key={`${location}${index}`}
							{...getItemProps({ item: location, index })}
						>
							<VStack gap={1} alignItems="flex-start" width="100%">
								<span className={css({ fontWeight: "bold" })}>
									{location.name}
								</span>
								<span>{location.address.formattedAddress}</span>
							</VStack>
						</li>
					))}
			</ul>
			{error && <p className={css({ textStyle: "error" })}>{error}</p>}
		</div>
	)
}
