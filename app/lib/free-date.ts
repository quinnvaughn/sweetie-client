import { GetFreeDateFragment } from "~/graphql/generated"
import { OrderedStop } from "~/stores"

export function getDefaultSelectedOptions(freeDate: GetFreeDateFragment) {
	return freeDate.orderedStops.reduce((acc, os) => {
		acc.set(os.order, {
			isSelected: os.optional ? false : true,
			selectedOptionOrder: 1,
			options: new Map(os.options.map((o) => [o.optionOrder, o])),
			stop: os,
		})
		return acc
	}, new Map<number, OrderedStop>())
}

export function getSelectedDateOptions(map: Map<number, OrderedStop>) {
	return Array.from(map)
		.map(([_, { options, selectedOptionOrder, isSelected }]) => {
			if (isSelected) {
				return options.get(selectedOptionOrder)?.id
			}
			return null
		})
		.filter((x) => x !== null) as string[]
}
