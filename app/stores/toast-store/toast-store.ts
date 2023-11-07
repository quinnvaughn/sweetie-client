import { create } from "zustand"

type Toast = {
	id: number
	message: string
	type: "success" | "error" | "warning" | "info"
}

type Position =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-center"
	| "bottom-center"

type State = {
	toasts: Toast[]
	addToast: (toast: Toast) => void
	removeToast: (id: number) => void
	position: Position
	setPosition: (position: Position) => void
}

export const toastStore = create<State>((set) => ({
	toasts: [],
	addToast: (toast) => set((state) => ({ toasts: [...state.toasts, toast] })),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
	position: "bottom-right",
	setPosition: (position) => set(() => ({ position })),
}))
