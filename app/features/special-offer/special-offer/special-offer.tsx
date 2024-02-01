import { useState } from "react"
import { BsArrowThroughHeartFill } from "react-icons/bs/index.js"
import { match } from "ts-pattern"
import { css, cva } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { FindingADateModal } from "../../free-date"

type Props = {
	specialOffer: {
		title: string
		description: string
		icon: string
		color: string
	}
}

const specialOfferRecipe = cva({
	base: {
		backgroundColor: "gray",
		borderRadius: "8px",
		padding: "20px",
	},
	variants: {
		bg: {
			valentinesDayRed: {
				backgroundColor: "#D41F3A",
			},
		},
	},
})

function iconValue(icon: string) {
	return match(icon)
		.with("heart", () => (
			<BsArrowThroughHeartFill
				className={css({
					width: {
						base: "40px",
						md: "60px",
					},
					height: {
						base: "40px",
						md: "60px",
					},
					color: "white",
				})}
			/>
		))
		.otherwise(() => null)
}

export function SpecialOffer({
	specialOffer: { title, description, icon, color },
}: Props) {
	const [open, setOpen] = useState(false)
	return (
		<>
			{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
			<HStack className={specialOfferRecipe({ bg: color as any })} gap={"20px"}>
				{iconValue(icon)}
				<VStack alignItems="flex-start" gap={3} flex={1}>
					<VStack alignItems="flex-start" gap={1}>
						<h2
							className={css({
								color: "white",
								fontSize: { base: "22px", md: "28px" },
								fontWeight: "bold",
							})}
						>
							{title}
						</h2>
						<p className={css({ color: "white", textWrap: "wrap" })}>
							{description}
						</p>
					</VStack>
					<p className={css({ color: "white", textWrap: "wrap" })}>
						Get a personalized Valentine's Day plan from our tastemakers for
						just $50!{" "}
						<button
							type="button"
							onClick={() => setOpen(true)}
							className={css({
								color: "white",
								fontWeight: "bold",
								_hover: {
									textDecoration: "underline",
									cursor: "pointer",
								},
							})}
						>
							Click here.
						</button>{" "}
						Or explore our free Valentine's Day date ideas below.
					</p>
				</VStack>
			</HStack>
			{open && (
				<FindingADateModal
					onClose={() => setOpen(false)}
					title="Valentine's Day Date"
					bodyText="The best dates are the ones you don't have to plan. Let us help you make this Valentine's Day special. We'll get back to you within 24 hours."
				/>
			)}
		</>
	)
}
