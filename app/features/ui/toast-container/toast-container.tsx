import { Toast } from "./toast"
import { useToast } from "~/hooks"
import { cva } from "~/styled-system/css"

const toast = cva({
	base: {
		display: "flex",
		flexDirection: "column-reverse",
		rowGap: "12px",
		position: "fixed",
		zIndex: 9999,
	},
	variants: {
		position: {
			"top-right": {
				top: "16px",
				right: "16px",
			},
			"top-left": {
				top: "16px",
				left: "16px",
			},
			"top-center": {
				top: "16px",
				left: "50%",
				transform: "translateX(-50%)",
			},
			"bottom-left": {
				bottom: "16px",
				left: "16px",
			},
			"bottom-center": {
				bottom: "16px",
				left: "50%",
				transform: "translateX(-50%)",
			},
			"bottom-right": {
				bottom: "16px",
				right: "16px",
			},
		},
	},
})

export function ToastContainer() {
	const { toasts, position } = useToast()

	return (
		<div className={toast({ position })}>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</div>
	)
}
