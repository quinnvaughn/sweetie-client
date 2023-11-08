export function formatTime(time: string) {
	let beginsAtTime = time
	if (time.length === 7) {
		beginsAtTime = `0${time}`
	}
	return beginsAtTime
}
