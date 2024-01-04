import { DateTime } from "luxon"

export function formatTime(time: string) {
	let beginsAtTime = time
	if (time.length === 7) {
		beginsAtTime = `0${time}`
	}
	return beginsAtTime
}

export function getMinutes(time: string) {
	const [hours, minutes] = time.split(":")
	return parseInt(hours) * 60 + parseInt(minutes)
}

export function getHourAndMinutes(time: number) {
	// time is in minutes
	const hours = Math.floor(time / 60)
	// minutes under 10 should be 0X
	const minutes = time % 60 < 10 ? `0${time % 60}` : time % 60
	return `${hours}:${minutes}`
}

export function generateTwentyFourHours(interval = 15) {
	const times = []

	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const time = DateTime.fromObject({ hour, minute }).toLocaleString(
				DateTime.TIME_SIMPLE,
			)
			times.push(time)
		}
	}
	return times
}

export function generateTimeIntervals(
	startTime: string,
	endTime: string,
	interval = 15,
) {
	const times = []

	const startMinutes = getMinutes(startTime)
	const endMinutes = getMinutes(endTime)

	for (let minute = startMinutes; minute <= endMinutes; minute += interval) {
		const time = getHourAndMinutes(minute)
		times.push(time)
	}
	return times
}
