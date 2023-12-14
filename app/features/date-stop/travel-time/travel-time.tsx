import { FaCar, FaWalking } from "react-icons/fa/index.js"
import { IoMdBoat } from "react-icons/io/index.js"
import { match } from "ts-pattern"
import { Travel, TravelMode } from "~/graphql/generated"
import { singularOrPlural } from "~/lib"
import { css } from "~/styled-system/css"
import { Divider } from "~/styled-system/jsx"
import { flex } from "~/styled-system/patterns"

function convertMetersToMiles(meters: number) {
	return (meters / 1609.344).toFixed(1) === "0.0"
		? "0.1"
		: (meters / 1609.344).toFixed(1)
}

function metersToMiles(meters: number) {
	return Math.round(meters / 1609.344)
}

function convertSecondsToMinutes(seconds: number) {
	return (seconds / 60).toFixed(0) === "0" ? "1" : (seconds / 60).toFixed(0)
}

function secondsToMinutes(seconds: number) {
	return Math.round(seconds / 60) === 0 ? 1 : Math.round(seconds / 60)
}

function showMode(mode: TravelMode) {
	return match(mode)
		.with(TravelMode.Car, () => (
			<FaCar size={20} className={css({ display: "inline-block" })} />
		))
		.with(TravelMode.Boat, () => (
			<IoMdBoat size={20} className={css({ display: "inline-block" })} />
		))
		.with(TravelMode.Walk, () => (
			<FaWalking size={20} className={css({ display: "inline-block" })} />
		))
		.otherwise(() => null)
}

type Props = {
	travel: Pick<Travel, "mode" | "distance" | "duration">
}

export function TravelTime({ travel }: Props) {
	return (
		<>
			<Divider color="gray" />
			<div
				className={flex({
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
				})}
			>
				<span className={css({ fontWeight: "bold" })}>Next stop:</span>
				<span>{showMode(travel.mode)}</span>
				{travel.mode === TravelMode.Boat ? (
					<span>Unable to calculate travel time</span>
				) : (
					<div className={css({ textAlign: "center" })}>
						<span>
							{convertMetersToMiles(travel.distance)}{" "}
							{singularOrPlural(
								metersToMiles(travel.distance),
								"mile",
								"miles",
							)}
						</span>
						{" for "}
						<span>
							{convertSecondsToMinutes(travel.duration)}{" "}
							{singularOrPlural(
								secondsToMinutes(travel.duration),
								"minute",
								"minutes",
							)}{" "}
						</span>
					</div>
				)}
			</div>
			<Divider color="gray" />
		</>
	)
}
