import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaTwitterSquare,
} from "react-icons/fa/index.js"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

const customLinkStyles = css({
	color: "black",
	textDecoration: "none",
	fontWeight: "bold",
	_hover: {
		textDecoration: "underline",
	},
})

export function SocialLinks() {
	return (
		<HStack gap={2} alignItems="flex-start">
			<a
				className={customLinkStyles}
				href={"https://www.facebook.com/profile.php?id=61552479945502"}
			>
				<FaFacebookSquare size={30} className={css({ color: "black" })} />
			</a>
			<a
				className={customLinkStyles}
				href={"https://www.instagram.com/trysweetie/"}
			>
				<FaInstagramSquare size={30} className={css({ color: "black" })} />
			</a>
			<a
				className={customLinkStyles}
				href={"https://twitter.com/sweetie_dates"}
			>
				<FaTwitterSquare size={30} className={css({ color: "black" })} />
			</a>
		</HStack>
	)
}
