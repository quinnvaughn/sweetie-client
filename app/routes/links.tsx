import { Link } from "@remix-run/react"
import { useEffect } from "react"
import {
	FaAngellist,
	FaFacebookF,
	FaInstagram,
	FaPinterestP,
	FaTiktok,
	FaTwitter,
} from "react-icons/fa/index.js"
import { $path } from "remix-routes"
import { PageContainer } from "~/features/ui"
import { useTrack } from "~/hooks"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

const customLinkStyles = css({
	backgroundColor: "#F5F4F3",
	textDecoration: "none",
	fontWeight: "bold",
	height: "40px",
	width: "40px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "4px",
	_hover: {
		textDecoration: "underline",
		filter: "brightness(0.9)",
	},
})

const otherLinkStyles = css({
	border: "1px solid",
	borderColor: "gray",
	borderRadius: "8px",
	outline: "none",
	backgroundColor: "white",
	padding: "16px",
	textAlign: "center",
	width: {
		base: "100%",
		md: "300px",
	},
	_hover: {
		backgroundColor: "rgb(247, 247, 247)",
		cursor: "pointer",
	},
})

export default function LinksRoute() {
	const track = useTrack()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		track("User Visited Links Page", {})
	}, [])
	return (
		<PageContainer
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<VStack gap={4} justifyContent="flex-start">
				<h1 className={css({ textStyle: "h1" })}>Links</h1>
				<HStack gap={2} alignItems="flex-start">
					<a
						className={customLinkStyles}
						href={"https://www.facebook.com/profile.php?id=61552479945502"}
					>
						<FaFacebookF size={20} className={css({ color: "black" })} />
					</a>
					<a
						className={customLinkStyles}
						href={"https://www.instagram.com/trysweetie/"}
					>
						<FaInstagram size={20} className={css({ color: "black" })} />
					</a>
					<a
						className={customLinkStyles}
						href={"https://twitter.com/sweetie_dates"}
					>
						<FaTwitter size={20} className={css({ color: "black" })} />
					</a>
					<a
						className={customLinkStyles}
						href={"https://tiktok.com/@sweetie_date_night"}
					>
						<FaTiktok size={20} className={css({ color: "black" })} />
					</a>
					<a
						className={customLinkStyles}
						href={"https://www.pinterest.com/sweetiedates/"}
					>
						<FaPinterestP size={20} className={css({ color: "black" })} />
					</a>
					<a
						className={customLinkStyles}
						href={"https://wellfound.com/company/sweetie-dates"}
					>
						<FaAngellist size={20} className={css({ color: "black" })} />
					</a>
				</HStack>
				<p className={css({ maxWidth: "400px", textAlign: "center" })}>
					Sweetie is a marketplace to help plan date nights, starting in Los
					Angeles. Think of us as your personal date concierge.
				</p>
				<Link to={$path("/")} className={otherLinkStyles}>
					Visit Website
				</Link>
				<Link
					to={$path("/contest/pay-for-my-date")}
					className={otherLinkStyles}
				>
					Weekly Contest
				</Link>
			</VStack>
		</PageContainer>
	)
}
