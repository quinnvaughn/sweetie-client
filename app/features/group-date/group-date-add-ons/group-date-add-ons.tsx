import { Image } from "~/features/ui"
import { GroupDateAddOnFragment } from "~/graphql/generated"
import { convertCentsToDollars } from "~/lib"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	addOns: GroupDateAddOnFragment[]
}

export function GroupDateAddOns({ addOns }: Props) {
	return (
		<VStack width={"100%"} alignItems={"flex-start"}>
			<h3 className={css({ textStyle: "h3" })}>
				Optional add-ons you can purchase:
			</h3>
			<p>
				If approved for a spot, we'll email you and provide an additional
				payment link for any add-ons you wish to include.
			</p>
			{addOns.map((addOn) => (
				<VStack width={"100%"} alignItems={"flex-start"} key={addOn.id} gap={2}>
					<h4
						className={css({
							textStyle: "h4",
							fontSize: "20px",
							fontWeight: "bold",
						})}
					>
						{addOn.name}
					</h4>
					{addOn.image && (
						<Image
							src={addOn.image}
							alt={addOn.name}
							css={{
								width: "100%",
								aspectRatio: "16/9",
								objectFit: "cover",
								borderRadius: "8px",
								backgroundColor: "gray",
								maxHeight: "300px",
							}}
						/>
					)}
					<span className={css({ textStyle: "paragraph" })}>
						{convertCentsToDollars(addOn.minimumPrice)} -{" "}
						{convertCentsToDollars(addOn.maximumPrice)}
					</span>
					<p>{addOn.description}</p>
				</VStack>
			))}
		</VStack>
	)
}
