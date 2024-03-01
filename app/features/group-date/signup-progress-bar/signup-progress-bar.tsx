import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	numSpots: number
	numSpotsFilled: number
}

export function SignupProgressBar({ numSpots, numSpotsFilled }: Props) {
	return (
		<VStack gap={2} alignItems={"center"} width={"100%"}>
			<div
				className={css({
					height: "20px",
					width: "100%",
					backgroundColor: "gray",
					borderRadius: "50px",
				})}
			>
				<div
					className={css({
						borderRadius: "50px",
						backgroundColor: "primary",
						height: "100%",
					})}
					style={{
						width: `${(numSpotsFilled / numSpots) * 100}%`,
						maxWidth: "100%",
					}}
				/>
			</div>
			<p
				className={css({
					fontSize: "16px",
					textAlign: "center",
					width: "100%",
					fontWeight: "bold",
				})}
			>
				{numSpotsFilled} / {numSpots} signups
			</p>
			<p>
				Waitlist positions don't guarantee a spot but prioritize payment link
				issuance. Don't hesitate to sign up if spots are 'filled.' If filled
				before you get an email, you'll be notified next time we do this event.
				Selected participants receive email notifications with payment details.
				Group size increases waitlist priority. Availability is first-come,
				first-served.
			</p>
		</VStack>
	)
}
