import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
	showSignupModal: boolean
	clearSignupModal: () => void
	timesViewedDates: number
	doNotShowSignupModal: boolean
	incrementTimesViewedDates: (
		isViewer: boolean,
		pathname: string,
		previousPath: string,
	) => void
}

export const signupStore = create(
	persist<State>(
		(set, get) => ({
			timesViewedDates: 0,
			showSignupModal: false,
			doNotShowSignupModal: false,
			clearSignupModal: () => set({ showSignupModal: false }),
			incrementTimesViewedDates: (viewer, pathname, previousPath) => {
				if (
					pathname.includes("add-to-calendar") ||
					pathname.includes("share") ||
					previousPath.includes("add-to-calendar") ||
					previousPath.includes("share")
				) {
					set({ showSignupModal: false })
					return
				}
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
