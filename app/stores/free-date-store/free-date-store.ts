import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
	showOnboardingTutorial: boolean
	setShowOnboardingTutorial: (show: boolean) => void
}

export const freeDateStore = create(
	persist<State>(
		(set) => ({
			showOnboardingTutorial: true,
			setShowOnboardingTutorial: (show) =>
				set({ showOnboardingTutorial: show }),
		}),
		{
			name: "free-date-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
