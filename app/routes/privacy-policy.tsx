import { PageContainer } from "~/features/ui"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export default function PrivacyPolicy() {
	return (
		<PageContainer
			width={{ base: "100%", md: 780, lg: 1024 }}
			padding={{ base: "20px", xl: "20px 0px" }}
		>
			<VStack gap={2} alignItems="flex-start">
				<h1 className={css({ textStyle: "h1" })}>Privacy Policy</h1>

				<p className={css({ textStyle: "paragraph" })}>
					Last updated: 12/17/2023
				</p>
				<p className={css({ textStyle: "paragraph" })}>
					Sweetie ("we," "our," or "us") is committed to protecting the privacy
					of our users. This Privacy Policy outlines the information we collect,
					how we use it, and the choices you have concerning your data. By using
					our services, you consent to the practices described in this policy.
				</p>
			</VStack>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Information We Collect
			</h2>

			<ol className={css({ listStyleType: "decimal" })}>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						User Account Information
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						When you sign up or log in to our platform, Sweetie, we collect and
						store the following information:
					</p>
				</li>
				<ul
					className={css({
						listStyleType: "disc",
						listStylePosition: "inside",
					})}
				>
					<li>Full Name</li>
					<li>Email Address</li>
				</ul>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						Optional Calendar Connection
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						Users have the option to connect their calendar to Sweetie. If you
						choose to enable this feature, we may collect and store the
						following information:
					</p>
				</li>
				<ul
					className={css({
						listStyleType: "disc",
						listStylePosition: "inside",
					})}
				>
					<li>Calendar Events</li>
					<li>Calendar Availability</li>
				</ul>
			</ol>
			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				How We Use Your Information
			</h2>
			<ol className={css({ listStyleType: "decimal" })}>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						User Account Information
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						We use your full name and email address for account creation,
						authentication, and to communicate important information regarding
						your Sweetie account.
					</p>
				</li>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						Optional Calendar Connection
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						If you choose to connect your Google Calendar to Sweetie, we use
						this information to provide personalized services, such as adding
						events on your behalf. We do not share your calendar information
						with third parties.
					</p>
				</li>
			</ol>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Information Sharing
			</h2>
			<p className={css({ textStyle: "paragraph" })}>
				We do not sell, trade, or otherwise transfer your personally
				identifiable information to third parties. This does not include trusted
				third parties who assist us in operating Sweetie, conducting our
				business, or servicing you, as long as those parties agree to keep this
				information confidential.
			</p>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Google API Services
			</h2>
			<p className={css({ textStyle: "paragraph" })}>
				Sweetie's use and transfer to any other app of information received from
				Google APIs will adhere to{" "}
				<a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
					Google API Services User Data Policy
				</a>
				, including the Limited Use requirements.
			</p>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Your Choices
			</h2>
			<ol className={css({ listStyleType: "decimal" })}>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						Account Information
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						You can review and update your Sweetie account information by
						logging into your account settings.
					</p>
				</li>
				<li>
					<h3 className={css({ textStyle: "h3", fontSize: "20px" })}>
						Calendar Connection
					</h3>
					<p className={css({ textStyle: "paragraph" })}>
						You can disconnect your calendar at any time through your Sweetie
						account settings. This will stop any further access to your calendar
						information.
					</p>
				</li>
			</ol>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>Security</h2>
			<p className={css({ textStyle: "paragraph" })}>
				We implement a variety of security measures to maintain the safety of
				your personal information when you enter, submit, or access your
				information.
			</p>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Changes to This Privacy Policy
			</h2>
			<p className={css({ textStyle: "paragraph" })}>
				We may update this Privacy Policy from time to time to reflect changes
				in our practices or for other operational, legal, or regulatory reasons.
				We encourage you to review this Privacy Policy periodically.
			</p>

			<h2 className={css({ textStyle: "h2", fontSize: "28px" })}>
				Contact Information
			</h2>
			<p className={css({ textStyle: "paragraph" })}>
				If you have any questions or concerns about our Privacy Policy, please
				contact us at{" "}
				<a href="mailto:quinn@trysweetie.com">quinn@trysweetie.com</a>.
			</p>
			<p className={css({ textStyle: "paragraph" })}>
				By using Sweetie, you agree to the terms outlined in this Privacy
				Policy.
			</p>
		</PageContainer>
	)
}
