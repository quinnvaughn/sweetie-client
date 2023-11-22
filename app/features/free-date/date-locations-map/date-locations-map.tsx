import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { ClientOnly } from "remix-utils/client-only"
import { Coordinates, DateStopItemFragment } from "~/graphql/generated"
import { getEnv } from "~/lib"
import { css } from "~/styled-system/css"

type Props = {
	stops: DateStopItemFragment[]
}

const env = getEnv()

export function DateLocationsMap({ stops }: Props) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
	})
	return isLoaded ? (
		<GoogleMap
			onLoad={(map) => {
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
						map: map,
						title: stops[i].location.name,
						label: `${i + 1}`,
					})

					bounds.extend(marker.getPosition() as google.maps.LatLng)
					marker.addListener("click", () => {
						infoWindow.open(map, marker)
					})
					map.setCenter(bounds.getCenter())
				}
				map.fitBounds(bounds)
			}}
			options={{
				mapTypeControlOptions: {
					mapTypeIds: ["roadmap"],
				},
				scrollwheel: true,
				fullscreenControl: false,
			}}
			mapContainerStyle={{
				width: "100%",
				height: "400px",
				borderRadius: "8px",
			}}
		/>
	) : (
		<div
			className={css({
				width: "100%",
				height: "300px",
				borderRadius: "8px",
				bg: "gray",
			})}
		/>
	)
}
