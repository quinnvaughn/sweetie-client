import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { DateStopOptionFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"

type Props = {
	stops: DateStopOptionFragment[]
	scrollwheel?: boolean
}

export function DateLocationsMap({ stops, scrollwheel = false }: Props) {
	const { isLoaded } = useJsApiLoader({
		// will always be window.
		googleMapsApiKey: window.ENV.GOOGLE_MAPS_API_KEY,
	})
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [markers, setMarkers] = useState<google.maps.Marker[]>([])

	function setBounds(map: google.maps.Map) {
		// clear any existing markers.
		for (const marker of markers) {
			marker.setMap(null)
			setMarkers([])
		}
		const bounds = new window.google.maps.LatLngBounds()
		for (let i = 0; i < stops.length; i++) {
			const infoWindow = new window.google.maps.InfoWindow({
				content: `<div><h2 style="font-weight: bold;">${i + 1}. ${
					stops[i].location.name
				}</h2><p>${stops[i].location.address.formattedAddress}</p></div>`,
			})
			const marker = new window.google.maps.Marker({
				position: new google.maps.LatLng(
					stops[i].location.address.coordinates.lat,
					stops[i].location.address.coordinates.lng,
				),
				title: stops[i].location.name,
				label: `${i + 1}`,
			})
			marker.setMap(map)
			setMarkers((prev) => [...prev, marker])

			bounds.extend(marker.getPosition() as google.maps.LatLng)
			marker.addListener("click", () => {
				infoWindow.open(map, marker)
			})
			map.setCenter(bounds.getCenter())
		}
		map.fitBounds(bounds)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isLoaded && map) {
			setBounds(map)
		}
	}, [stops, isLoaded, map])

	return isLoaded ? (
		<div className={css({ width: "100%", height: "auto" })}>
			<GoogleMap
				onLoad={(map) => {
					setMap(map)
					setBounds(map)
				}}
				options={{
					mapTypeControlOptions: {
						mapTypeIds: ["roadmap"],
					},
					scrollwheel,
					fullscreenControl: false,
				}}
				mapContainerClassName={css({
					width: "100%",
					height: { base: "300px", md: "400px" },
					borderRadius: "8px",
				})}
			/>
			{/** This is for onboarding. */}
			<div id="date-locations-map" />
		</div>
	) : (
		<div
			className={css({
				width: "100%",
				height: "400px",
				borderRadius: "8px",
				bg: "gray",
			})}
		/>
	)
}
