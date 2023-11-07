import { toastStore } from "~/stores"

export function useToast() {
	const { addToast, removeToast, toasts, position, setPosition } = toastStore()

	function info(message: string) {
		addToast({ id: Date.now(), message, type: "info" })
	}

	function success(message: string) {
		addToast({ id: Date.now(), message, type: "success" })
	}

	function warning(message: string) {
		addToast({ id: Date.now(), message, type: "warning" })
	}

	function error(message: string) {
		addToast({ id: Date.now(), message, type: "error" })
	}

	return {
		info,
		success,
		warning,
		error,
		toasts,
		removeToast,
		position,
		setPosition,
	}
}
