import { Link, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { $path } from "remix-routes"
import { GetUserToSignUpModal, Image, SignupModal } from "~/features/ui"
import { UserAvatar } from "~/features/user"
import { FreeDateCardFragment } from "~/graphql/generated"
import { useToast } from "~/hooks"
import { action } from "~/routes/api.toggle-favorite"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { numLines } from "~/styled-system/patterns"
import { NSFWTag } from ".."
import { FavoriteIcon } from "../favorite-icon"

type Props = {
	date: FreeDateCardFragment
	loading?: "lazy" | "eager"
}

export function FreeDateCard({ date, loading = "eager" }: Props) {
	const fetcher = useFetcher<typeof action>()

	const { error, success } = useToast()
	const [open, setOpen] = useState(false)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fetcher.data?.success === false && fetcher.data?.message) {
			error(fetcher.data.message)
		}
		if (fetcher.data?.success === true && fetcher.data.type) {
			success(
				`${fetcher.data.type === "saved" ? "Saved" : "Removed"} ${date.title}`,
			)
		}
		if (fetcher.data?.signup) {
			// open auth modal
			setOpen(true)
		}
	}, [fetcher.data])

	function favoriteDate() {
		fetcher.submit(
			{ id: date.id },
			{ action: $path("/api/toggle-favorite"), method: "post" },
		)
	}

	return (
		<>
			<Link
				className={css({
					position: "relative",
					display: "block",
					textDecoration: "none",
					width: "100%",
					_visited: { color: "inherit" },
				})}
				to={$path("/free-date/:id", { id: date.id })}
				target="_blank"
			>
				<FavoriteIcon onClick={favoriteDate} favorited={date.viewerFavorited} />
				<VStack gap="4" width={"100%"} alignItems="flex-start">
					<Image
						loading={loading}
						src={date.thumbnail}
						alt={`${date.title} thumbnail`}
						css={{
							aspectRatio: "20/19",
							objectFit: "cover",
							borderRadius: "8px",
							backgroundColor: "gray",
							width: "100%",
						}}
					/>
					<VStack gap="2" alignItems={"flex-start"} width={"100%"}>
						<p className={css({ lineHeight: 1, fontWeight: "600" })}>
							{date.title}
						</p>
						{date.nsfw && <NSFWTag />}
						<p className={numLines({ color: "grayText", lines: 2 })}>
							{date.description}
						</p>
						<HStack gap={1} alignItems="center">
							<UserAvatar
								size={"sm"}
								user={{
									name: date.tastemaker.user.name,
									avatar: date.tastemaker.user.profile?.avatar,
								}}
							/>
							<p className={css({ color: "grayText" })}>
								{date.tastemaker.user.name}
							</p>
						</HStack>
						<p
							className={numLines({
								lines: 2,
								lineHeight: 1.2,
								whiteSpace: "pre-line",
								color: "grayText",
							})}
						>
							{date.cities.map((city) => city.nameAndState).join("\n")}
						</p>
					</VStack>
				</VStack>
			</Link>
			{open && (
				<GetUserToSignUpModal
					headingText="Sign up to favorite dates"
					bodyText="Create an account to save your dates and get access to more features."
					onClose={() => setOpen(false)}
					onSuccess={() => {
						setOpen(false)
						favoriteDate()
					}}
				/>
			)}
		</>
	)
}
