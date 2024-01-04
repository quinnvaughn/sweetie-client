import { useSelect } from "downshift"
import { FaChevronDown, FaChevronUp } from "react-icons/fa/index.js"
import { css, cva } from "~/styled-system/css"

type Props = {
	onChange: (item: string) => void
	options: string[]
	defaultValue: string
}

const dropdownItem = cva({
	base: {
		padding: "8px",
		backgroundColor: "white",
		justifyContent: "space-between",
		cursor: "pointer",
		borderRadius: "4px",
		display: "flex",
		alignItems: "center",
		width: "100%",
		gap: 1,
	},
	variants: {
		highlighted: {
			true: {
				backgroundColor: "rgb(232, 232, 232)",
			},
		},
		selected: {
			true: {
				fontWeight: "bold",
			},
		},
	},
})

export function Select({ onChange, options, defaultValue }: Props) {
	const {
		isOpen,
		selectedItem,
		getToggleButtonProps,
		getItemProps,
		getMenuProps,
		highlightedIndex,
	} = useSelect({
		items: options,
		defaultSelectedItem: defaultValue,
		onSelectedItemChange: ({ selectedItem }) => {
			if (selectedItem) {
				onChange(selectedItem)
			}
		},
	})

	return (
		<div>
			<div
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: 1,
					width: "120px",
				})}
			>
				<div
					className={css({
						padding: "8px",
						backgroundColor: "white",
						justifyContent: "space-between",
						cursor: "pointer",
						border: "1px solid",
						borderColor: "gray",
						borderRadius: "4px",
						display: "flex",
						alignItems: "center",
						gap: 1,
					})}
					{...getToggleButtonProps()}
				>
					<span>{selectedItem}</span>
					{isOpen ? (
						<FaChevronUp className={css({ color: "black" })} size={14} />
					) : (
						<FaChevronDown className={css({ color: "black" })} size={14} />
					)}
				</div>
			</div>
			<ul
				className={css({
					position: "absolute",
					backgroundColor: "white",
					boxShadow: "md",
					maxHeight: { base: "100px", md: "200px" },
					overflowY: "scroll",
					overflowX: "hidden",
					padding: "0px",
					zIndex: 999999,
					width: "120px",
					borderRadius: "4px",
					scrollbar: "hidden",
				})}
				{...getMenuProps()}
			>
				{isOpen &&
					options.map((item, index) => (
						<li
							className={dropdownItem({
								highlighted: highlightedIndex === index,
								selected: selectedItem === item,
							})}
							key={item}
							{...getItemProps({ item, index })}
						>
							<span>{item}</span>
						</li>
					))}
			</ul>
		</div>
	)
}
