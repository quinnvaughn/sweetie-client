import { createContext, useReducer, useState } from "react"
import { useRef } from "react"
import { useContext } from "react"
import { match } from "ts-pattern"
import {
	DateStopOptionFragment,
	OrderedDateStopFragment,
} from "~/graphql/generated"

export function useStopsContext() {
	const store = useContext(StopsContext)
	if (!store) throw new Error("Missing StopsContext.Provider in the tree")
	return store
}

export const StopsContext = createContext<StopsStore | null>(null)

type StopsProviderProps = React.PropsWithChildren<{
	value: {
		state: StopsProps
		dispatch: React.Dispatch<Action>
	}
}>

export function StopsProvider({ children, value }: StopsProviderProps) {
	return <StopsContext.Provider value={value}>{children}</StopsContext.Provider>
}

export type OrderedStop = {
	isSelected: boolean
	// keep track of the selected option for a stop
	selectedOptionOrder: number
	// Store all the options for a stop
	options: Map<number, DateStopOptionFragment>
	// want to reference the ordered stop
	stop: OrderedDateStopFragment
}

interface StopsProps {
	orderedStops: Map<number, OrderedStop>
}

type StopsStore = ReturnType<typeof createStopsStore>

type Action =
	| {
			type: "SET_ORDERED_STOP_OPTION"
			order: number
			option: DateStopOptionFragment
	  }
	| { type: "SET_ORDERED_STOP_SELECTED"; order: number; selected: boolean }

function stopsReducer(state: StopsProps, action: Action): StopsProps {
	return match(action)
		.with({ type: "SET_ORDERED_STOP_OPTION" }, (action) => {
			const map = new Map(state.orderedStops)
			const orderedStop = map.get(action.order)
			if (!orderedStop) return state
			return {
				...state,
				orderedStops: map.set(action.order, {
					...orderedStop,
					selectedOptionOrder: action.option.optionOrder,
				}),
			}
		})
		.with({ type: "SET_ORDERED_STOP_SELECTED" }, (action) => {
			const map = new Map(state.orderedStops)
			const orderedStop = map.get(action.order)
			if (!orderedStop) return state
			return {
				...state,
				orderedStops: map.set(action.order, {
					...orderedStop,
					isSelected: action.selected,
				}),
			}
		})
		.exhaustive()
}

export const createStopsStore = (initProps?: Partial<StopsProps>) => {
	const DEFAULT_PROPS: StopsProps = {
		orderedStops: new Map(),
	}

	const [state, dispatch] = useReducer(stopsReducer, {
		...DEFAULT_PROPS,
		...initProps,
	})

	return { state, dispatch }
}
