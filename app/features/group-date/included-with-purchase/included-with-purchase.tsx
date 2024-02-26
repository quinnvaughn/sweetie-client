import { Image } from "~/features/ui"
import { EventProductFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	products: EventProductFragment[]
}

export function IncludedWithPurchase({ products }: Props) {
	return (
		<VStack width={"100%"} alignItems={"flex-start"}>
			<h3 className={css({ textStyle: "h3" })}>Included with your purchase:</h3>
			<p>
				If approved for a spot, we'll email you and provide a payment link in
				advance to manage payments for the venues.
			</p>
			{products.map((product) => (
				<VStack
					width={"100%"}
					alignItems={"flex-start"}
					key={product.id}
					gap={2}
				>
					<h4
						className={css({
							textStyle: "h4",
							fontSize: "20px",
							fontWeight: "600",
						})}
					>
						{product.name}
					</h4>
					{product.image && (
						<Image
							src={product.image}
							alt={product.name}
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
					<p>{product.description}</p>
				</VStack>
			))}
		</VStack>
	)
}
