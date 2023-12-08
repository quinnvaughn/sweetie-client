import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
	showSignupModal: boolean
	cleared: boolean
	clearSignupModal: () => void
	timesViewedDates: number
	incrementTimesViewedDates: (isViewer: boolean) => void
}

export const signupStore = create(
	persist<State>(
		(set, get) => ({
			timesViewedDates: 0,
			cleared: false,
			showSignupModal: false,
			clearSignupModal: () => set({ showSignupModal: false, cleared: true }),
			incrementTimesViewedDates: (viewer) => {
				const newValue = viewer ? 0 : get().timesViewedDates + 1
				set({ timesViewedDates: newValue })
				if (newValue >= 3) {
					if (get().cleared) {
						set({ showSignupModal: false, cleared: false })
					} else {
						set({ showSignupModal: true })
					}
				}
			},
		}),
		{
			name: "signup-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
