import { useCombobox } from "downshift"
import { useController } from "react-hook-form"
import { useRemixFormContext } from "remix-hook-form"
import { $path } from "remix-routes"
import { useSpinDelay } from "spin-delay"
import { Spinner } from "~/features/ui"
import { useCustomFetcher } from "~/hooks"
import { AddLocationValues } from "~/routes/api.create-location"
import { loader } from "~/routes/api.google-locations"
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
}

const defaultValues = {
	website: "",
	name: "",
	address: {
		postalCode: "",
		city: "",
		state: "",
		street: "",
	},
}

function splitUpAddress(address: string) {
	const [street, city, stateInitialsAndPostalCode] =
		address.split(",").map((p) => p.trim()) ?? []
	const [stateInitials, postalCode] =
		stateInitialsAndPostalCode?.split(" ") ?? []
	return {
		street,
		postalCode,
		city,
		state: stateInitials,
	}
}

export function GoogleLocationCombobox({ label, required }: Props) {
	const fetcher = useCustomFetcher<typeof loader>()
	const showSpinner = useSpinDelay(fetcher.state === "loading", { delay: 300 })
	const locations = fetcher.data?.locations ?? []
	const { control } = useRemixFormContext<AddLocationValues>()
	const { field: addressField } = useController({
		control,
		name: "address",
	})
	const { field: nameField } = useController({
		control,
		name: "name",
	})
	const { field: websiteField } = useController({
		control,
		name: "website",
	})
	type Location = typeof locations[number]

	const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
		useCombobox<Location>({
			id: "google-location-combobox",
			items: locations,
			itemToString: (location) => location?.name ?? "",
			onSelectedItemChange({ selectedItem }) {
				if (selectedItem) {
					const { city, postalCode, state, street } = splitUpAddress(
						selectedItem.formattedAddress,
					)
					addressField.onChange({ city, postalCode, state, street })
					nameField.onChange(selectedItem.name)
					websiteField.onChange(selectedItem.website)
				} else {
					addressField.onChange(defaultValues.address)
					nameField.onChange(defaultValues.name)
					websiteField.onChange(defaultValues.website)
				}
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
						{ method: "GET", action: $path("/api/google-locations") },
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
					<div className={css({ display: "flex", gap: 0.5, flexGrow: 1 })}>
						<input
							{...getInputProps()}
							placeholder="Search for a location"
							className={css({ width: "100%", outline: "none" })}
						/>
						{showSpinner && <Spinner />}
					</div>
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
								"&:hover": { bg: "#EEEEEE" },
							})}
							key={`${location}${index}`}
							{...getItemProps({ item: location, index })}
						>
							<VStack gap={1} alignItems="flex-start" width="100%">
								<span className={css({ fontWeight: "bold" })}>
									{location.name}
								</span>
								<span>{location.formattedAddress}</span>
							</VStack>
						</li>
					))}
			</ul>
		</div>
	)
}
