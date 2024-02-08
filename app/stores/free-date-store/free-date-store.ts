import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import {
	DateStopOptionFragment,
	OrderedDateStopFragment,
} from "~/graphql/generated"

type SelectedOption = {
	isSelected: boolean
	option: DateStopOptionFragment
	orderedStop: OrderedDateStopFragment
}

type State = {
	showOnboardingTutorial: boolean
	setShowOnboardingTutorial: (show: boolean) => void
	setSelectedDateOptions: (dateOptions: Map<number, SelectedOption>) => void
	// number is the order of the date stop
	// we can then see if the date stop is selected or not
	// as well as which option is currently shown
	selectedDateOptions: Map<number, SelectedOption>
}

export const freeDateStore = create(
	persist<State>(
		(set) => ({
			showOnboardingTutorial: true,
			setShowOnboardingTutorial: (show) =>
				set({ showOnboardingTutorial: show }),
			setSelectedDateOptions: (dateOptions) =>
				set({ selectedDateOptions: dateOptions }),
			selectedDateOptions: new Map<
				number,
				{
					isSelected: boolean
					option: DateStopOptionFragment
					orderedStop: OrderedDateStopFragment
				}
			>(),
		}),
		{
			name: "free-date-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
