import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride"
import { useTrack } from "~/hooks"
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
	const track = useTrack()
	return (
		<Joyride
			disableOverlayClose
			continuous
			disableOverlay
			hideCloseButton
			disableCloseOnEsc
			hideBackButton
			showSkipButton={false}
			run={showOnboardingTutorial}
			callback={(data) => {
				const { type, action, status } = data
				if (action === ACTIONS.CLOSE || type === EVENTS.TOUR_END) {
					setShowOnboardingTutorial(false)
					window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
				}
				if (status === STATUS.FINISHED) {
					track("User Completed Onboarding Tutorial", {})
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
					locale: { next: "Close" },
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
					locale: { next: "Close" },
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
					locale: { next: "Close" },
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
					locale: { next: "Close" },
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
					locale: { next: "Close" },
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
					locale: { next: "Close" },
				},
			]}
		/>
	)
}
