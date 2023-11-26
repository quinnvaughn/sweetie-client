import { Link } from "@remix-run/react"
import { useCombobox } from "downshift"
import { $path } from "remix-routes"
import { useControlField, useField } from "remix-validated-form"
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
	locationPath: string
	fields: {
		name: string
		id: string
	}
	required?: boolean
}

export function LocationCombobox({
	label,
	fields,
	required,
	locationPath,
}: Props) {
	const fetcher = useCustomFetcher<typeof loader>()
	const [id, setId] = useControlField<string>(fields.id)
	const {
		error,
		getInputProps: getFieldProps,
		clearError,
	} = useField(fields.name)
	const { error: fieldError } = useField(fields.id)
	const [value] = useControlField<string>(fields.name)
	const locations = fetcher.data?.locations ?? []
	type Location = typeof locations[number]

	const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
		useCombobox<Location>({
			id: "location-combobox",
			items: locations,
			defaultInputValue: value,
			itemToString: (location) => location?.name ?? "",
			onSelectedItemChange({ selectedItem }) {
				setId(selectedItem?.id ?? "")
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
						placeholder="Search for a location/establishment"
						className={css({ width: "100%", outline: "none" })}
						{...getFieldProps({
							...getInputProps({
								id: fields.name,
								name: fields.name,
							}),
						})}
					/>
					<input type="hidden" name={fields.id} value={id ?? ""} />
				</div>
			</div>
			<ul className={menu({ hidden: !isOpen })} {...getMenuProps()}>
				{isOpen &&
					locations.map((location, index) => (
						<li
							className={css({
								paddingY: 2,
								paddingX: 3,
								cursor: "pointer",
								"&:hover": { bg: "#EEEEEE" },
							})}
							key={`${location.name}${index}`}
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
				<li className={css({ width: "100%" })}>
					<Link
						to={locationPath}
						className={css({
							display: "block",
							textAlign: "center",
							paddingY: 2,
							paddingX: 3,
							cursor: "pointer",
							width: "100%",
							"&:hover": { bg: "#EEEEEE" },
						})}
					>
						+ Add new location
					</Link>
				</li>
			</ul>
			{error ? (
				<p className={css({ textStyle: "error" })}>{error}</p>
			) : fieldError ? (
				<p className={css({ textStyle: "error" })}>{fieldError}</p>
			) : null}
		</div>
	)
}
