import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
	showSignupModal: boolean
	clearSignupModal: () => void
	timesViewedDates: number
	incrementTimesViewedDates: (isViewer: boolean) => void
}

export const signupStore = create(
	persist<State>(
		(set, get) => ({
			timesViewedDates: 0,
			showSignupModal: false,
			clearSignupModal: () => set({ showSignupModal: false }),
			incrementTimesViewedDates: (viewer) => {
				const newValue = viewer ? 0 : get().timesViewedDates + 1
				set({ timesViewedDates: newValue })
				if (newValue >= 3) {
					set({ showSignupModal: true })
				} else {
					set({ showSignupModal: false })
				}
			},
		}),
		{
			name: "signup-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
