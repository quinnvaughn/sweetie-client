import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
	showLoginPopup: boolean
	setShowLoginPopup: (show: boolean) => void
}

export const loginStore = create(
	persist<State>(
		(set) => ({
			showLoginPopup: true,
			setShowLoginPopup: (show) => set({ showLoginPopup: show }),
		}),
		{
			name: "login-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
