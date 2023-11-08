import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { ClientOnly } from "remix-utils/client-only"
import { Coordinates } from "~/graphql/generated"
import { getEnv } from "~/lib"
import { css } from "~/styled-system/css"

type Props = {
	coordinates: Coordinates
}

const env = getEnv()

export function DateStopMap({ coordinates }: Props) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
	})
	return isLoaded ? (
		<GoogleMap
			center={coordinates}
			zoom={15}
			options={{
				mapTypeControlOptions: {
					mapTypeIds: ["roadmap"],
				},
				scrollwheel: false,
				fullscreenControl: false,
			}}
			mapContainerStyle={{
				width: "100%",
				height: "300px",
				borderRadius: "8px",
			}}
		>
			<MarkerF position={coordinates} />
		</GoogleMap>
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
