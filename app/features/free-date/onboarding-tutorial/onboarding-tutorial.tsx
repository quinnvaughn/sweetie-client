import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride"
import { freeDateStore } from "~/stores"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	title: string
	content: string
}

function Content({ title, content }: Props) {
	return (
		<VStack gap={3}>
			<h2 className={css({ textStyle: "h2", fontSize: "20px" })}>{title}</h2>
			<p className={css({ textStyle: "paragraph" })}>{content}</p>
		</VStack>
	)
}

export function OnboardingTutorial() {
	const { showOnboardingTutorial, setShowOnboardingTutorial } = freeDateStore()
	return (
		<Joyride
			disableOverlayClose
			continuous
			disableOverlay
			showSkipButton
			run={showOnboardingTutorial}
			callback={(data) => {
				const { type, action } = data
				if (action === ACTIONS.CLOSE || type === EVENTS.TOUR_END) {
					setShowOnboardingTutorial(false)
					window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
				}
			}}
			styles={{
				options: {
					primaryColor: "#FF559D",
				},
			}}
			steps={[
				{
					content: (
						<Content
							content="Hey there, date night explorer! 🌟 Ready to dive into pre-planned date nights crafted by our awesome tastemakers? Let's make sure you're all set to create some unforgettable memories!"
							title="Welcome to Sweetie!"
						/>
					),
					disableBeacon: true,
					target: "body",
					placement: "center",
				},
				{
					content: (
						<Content
							content="Scroll through the curated stops designed just for you. Uncover the magic at each location and get ready for some serious romance."
							title="Explore the itinerary"
						/>
					),
					disableBeacon: true,
					target: "#first-stop",
				},
				{
					content: (
						<Content
							content="Want a quick overview? Click on the map and see all the sweet spots for your date night. Dive into the details, plan your journey, and get ready for a fantastic time."
							title="Explore the Map"
						/>
					),
					disableBeacon: true,
					target: "#date-locations-map",
					placement: "bottom",
				},
				{
					content: (
						<Content
							content="Ever wondered who's behind the genius date night ideas? Get to know our tastemaker and the stories that inspired your date night. Swipe right to check out more of their gems!"
							title="Meet Your Tastemaker"
						/>
					),
					disableBeacon: true,
					target: "#tastemaker-info",
				},
				{
					content: (
						<Content
							content="Found an itinerary that is stealing your heart? Hit 'Save' for later or 'Share' to spread the love. Tag your pals or drop a hint to your special someone!"
							title="Save & Share the Love"
						/>
					),
					disableBeacon: true,
					target: "#share-and-save",
				},
				{
					content: (
						<Content
							content="Ready to turn plans into reality? Click 'Go on this date' to add the date night to your calendar. Never miss a romantic beat with timely reminders and smooth planning."
							title="Schedule the Romance"
						/>
					),
					disableBeacon: true,
					target: "#go-on-this-date-desktop",
				},
				{
					content: (
						<Content
							content="Ready to turn plans into reality? Click 'Go on this date' to add the date night to your calendar. Never miss a romantic beat with timely reminders and smooth planning."
							title="Schedule the Romance"
						/>
					),
					disableBeacon: true,
					target: "#go-on-this-date-mobile",
				},
				{
					content: (
						<Content
							content="Curious about what else we have got in these cities? Click on a city, and start exploring different dates to spice up your romantic repertoire!"
							title="Explore More Dates"
						/>
					),
					disableBeacon: true,
					target: "#location-cities",
				},
				{
					content: (
						<Content
							content="Unable to find the perfect date night? Click here and let our experts whip up a personalized date night just for you. Because everyone deserves a unique and magical experience!"
							title="Seeking Something Special? Tell Us!"
						/>
					),
					disableBeacon: true,
					target: "#help-finding-date",
				},
				{
					content: (
						<p className={css({ textStyle: "paragraph" })}>
							Ready for a night to remember? Dive into your curated date night
							now and let the magic unfold!
						</p>
					),
					locale: { last: "Let's go!" },
					hideBackButton: true,
					disableBeacon: true,
					target: "body",
					placement: "center",
				},
			]}
		/>
	)
}
