import { MetaFunction } from "@remix-run/node"
import { PageContainer } from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export const meta: MetaFunction = () => {
	return [
		{ title: "Sweetie Date Night Contest: Pay For My Date!" },
		{
			name: "description",
			content: "Contest Alert! Win $50 towards your next Sweetie date night!",
		},
	]
}

export default function PayForMyDateRoute() {
	return (
		<PageContainer
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", md: "40px 20px" }}
		>
			<VStack
				gap={4}
				justifyContent="flex-start"
				alignItems={"flex-start"}
				width={"100%"}
			>
				<h1 className={css({ textStyle: "h1" })}>
					🎉 Weekly Date Night Contest Alert! 🎉
				</h1>
				<p>
					Hey Sweetie Community! Ready for some extra sweetness in your date
					night plans? We're thrilled to announce our weekly contest where we'll
					be giving away $50 towards one lucky user's date night adventure!
				</p>
				<div
					className={css({
						width: "100%",
						display: "flex",
						justifyContent: "center",
					})}
				>
					<img
						className={css({
							height: "300px",
							width: "auto",
							borderRadius: "4px",
						})}
						alt="austin powers yeah baby yeah gif"
						src="https://media1.tenor.com/m/XRbkPJly5NUAAAAC/yeah-baby-yeah.gif"
					/>
				</div>
				<h2 className={css({ textStyle: "h2" })}>Here's how to participate:</h2>{" "}
				<ol
					className={css({
						listStylePosition: "inside",
						listStyleType: "decimal",
					})}
				>
					<li>
						<b>Register on Sweetie:</b> Make sure you have a registered account
						on Sweetie. If you haven't signed up yet, don't miss out—register
						now to join the fun!
					</li>
					<li>
						<b>Follow us on TikTok:</b> Follow us on{" "}
						<a
							href="https://tiktok.com/@sweetie_date_night"
							className={css({
								color: "secondary",
								fontWeight: "500",
								_hover: {
									textDecoration: "underline",
								},
							})}
						>
							TikTok
						</a>{" "}
						(@sweetie_date_night) . Stay tuned for exclusive content, date night
						ideas, and of course, contest updates!
					</li>
					<li>
						<b>Explore our Date Night Selections:</b> Discover the array of
						delightful date night options crafted by our tastemakers. From cozy
						dinners to adventurous outings, we've got something for everyone!
					</li>
					<li>
						<b>Choose and Go on a Sweetie Date:</b> Pick your favorite Sweetie
						date from our curated selections. Once you've chosen, it's time to
						add it to your calendar and embark on your romantic rendezvous!
					</li>
					<li>
						<b>Create a TikTok Video:</b> Capture the magic of your Sweetie date
						night adventure! Record your experience and tag Sweetie in the
						description. Make sure to include the name of the date in your
						video.
					</li>
					<li>
						<b>Location:</b> Set the location of your video to Los Angeles on
						TikTok.
					</li>
					<li>
						<b>Keep Direct Messages Open:</b> Make sure your direct messages are
						open so we can notify you if you're the lucky winner! We'll reach
						out to inform you that you've won the $50 towards your next Sweetie
						date night adventure.
					</li>
					<li>
						<b>Make sure to have Venmo:</b> We'll send you the $50 via Venmo. If
						you don't have Venmo, you can download it{" "}
						<a
							href="https://apps.apple.com/us/app/venmo/id351727428"
							className={css({
								color: "secondary",
								fontWeight: "500",
								_hover: {
									textDecoration: "underline",
								},
							})}
						>
							here
						</a>
						.
					</li>
				</ol>
				<h2 className={css({ textStyle: "h2" })}>
					🌟 Celebration and Spotlight: 🌟
				</h2>
				<p>
					Each week, we'll select the best video and announce them on our social
					accounts. The chosen video will be featured across all our platforms,
					celebrating your Sweetie date night experience and inspiring others in
					the Sweetie community!
				</p>
				<p>
					So what are you waiting for? Choose your Sweetie date, experience the
					magic, and share your story on TikTok! Remember, the better your
					video, the better your chances to win!
				</p>
				<p>
					Keep spreading the love, Sweetie community, and let's make every date
					night unforgettable! 💖✨
				</p>
				<div
					className={css({
						width: "100%",
						display: "flex",
						justifyContent: "center",
					})}
				>
					<img
						alt="lady and the tramp gif"
						className={css({
							height: "300px",
							width: "auto",
							borderRadius: "4px",
						})}
						src="https://tenor.com/view/luncheon-lunch-seymour-gif-27684354.gif"
					/>
				</div>
			</VStack>
		</PageContainer>
	)
}
