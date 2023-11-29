import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { UserAvatar } from "~/features/user"
import { TastemakerInfoFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	tastemaker: TastemakerInfoFragment
}

export function TastemakerInfo({ tastemaker }: Props) {
	return (
		<VStack gap={2} alignItems="flex-start">
			<HStack gap={1} alignItems="center">
				<p className={css({ textStyle: "paragraph" })}>Tastemaker:</p>
				<HStack
					gap={2}
					justifyContent="flex-start"
					alignItems="center"
					flexWrap="wrap"
				>
					<UserAvatar
						size="md"
						user={{
							name: tastemaker.user.name,
							avatar: tastemaker.user.profile?.avatar,
						}}
					/>
					<Link
						prefetch="intent"
						to={$path("/user/:username", {
							username: tastemaker.user.username,
						})}
						className={css({ fontWeight: "bold", textDecoration: "underline" })}
					>
						{tastemaker.user.name}
					</Link>
				</HStack>
			</HStack>
			{/* {tastemaker.isSetup && (
				<Tooltip text={`Costs ${tastemaker.formattedPrice} per stop.`}>
					<LinkAsButton
						variant="secondary"
						to={ROUTES.CUSTOM_DATE.REQUEST.buildPath({
							username: tastemaker.user.username,
						})}
					>
						Request a custom date from {tastemaker.user.name.split(" ")[0]}
					</LinkAsButton>
				</Tooltip>
			)} */}
		</VStack>
	)
}
