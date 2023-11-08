import { css } from "~/styled-system/css"

const weekdayText = css({
	padding: "8px",
	flex: "calc(1/7)",
	fontSize: "12px",
	textTransform: "uppercase",
	textAlign: "center",
	textDecoration: "underline",
})

export default function Weekdays() {
	return (
		<div className={css({ display: "flex" })}>
			<p className={weekdayText}>Sun</p>
			<p className={weekdayText}>Mon</p>
			<p className={weekdayText}>Tue</p>
			<p className={weekdayText}>Wed</p>
			<p className={weekdayText}>Thu</p>
			<p className={weekdayText}>Fri</p>
			<p className={weekdayText}>Sat</p>
		</div>
	)
}
