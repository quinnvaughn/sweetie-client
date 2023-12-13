import { useFetcher } from "@remix-run/react"
import { FiX } from "react-icons/fi/index.js"
import { IoIosCheckmarkCircleOutline } from "react-icons/io/index.js"
import { $path } from "remix-routes"
import { match } from "ts-pattern"
import {
	CopyLinkShareButton,
	FacebookShareButton,
	Image,
	TwitterShareButton,
} from "~/features/ui"
import { UserAvatar } from "~/features/user"
import { GetFreeDateFragment } from "~/graphql/generated"
import { action } from "~/routes/api.clear-share-screen"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { flex } from "~/styled-system/patterns"

const campaign = "tastemaker share date"

type Props = {
	freeDate: GetFreeDateFragment
}

export function ShareDateScreen({ freeDate }: Props) {
	const fetcher = useFetcher<typeof action>()

	function closeScreen() {
		fetcher.submit(
			{ id: freeDate.id },
			{ action: $path("/api/clear-share-screen"), method: "post" },
		)
	}

	return (
		<div className={css({ width: "100%" })}>
			<div
				className={flex({
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					borderBottom: "1px solid",
					borderBottomColor: "gray",
					padding: {
						base: "20px 8px",
						md: "8px",
					},
				})}
			>
				<button
					type="button"
					onClick={closeScreen}
					className={css({
						background: "none",
						border: "none",
						cursor: "pointer",
						_hover: {
							opacity: 0.7,
						},
					})}
				>
					<FiX size={"24px"} className={css({ color: "black" })} />
				</button>
				<p
					className={css({
						fontWeight: "bold",
						fontSize: { base: "18px", md: "24px" },
					})}
				>
					Share your date:
				</p>
				<div aria-hidden={true} className={css({ opacity: "0" })}>
					Back
				</div>
			</div>
			<div
				className={css({
					display: "flex",
					justifyContent: "center",
					width: "100%",
				})}
			>
				<VStack
					alignItems="flex-start"
					justifyContent={"flex-start"}
					gap={4}
					paddingY={"20px"}
					width={"300px"}
				>
					<VStack gap="4" width={"100%"} alignItems="flex-start">
						<Image
							src={freeDate.thumbnail}
							alt={`${freeDate.title} thumbnail`}
							css={{
								aspectRatio: "20/19",
								objectFit: "cover",
								borderRadius: "8px",
								backgroundColor: "gray",
							}}
						/>
						<VStack gap="2" alignItems={"flex-start"} width={"100%"}>
							<p className={css({ lineHeight: 1, fontWeight: "600" })}>
								{freeDate.title}
							</p>
							<HStack gap={1} alignItems="center">
								<UserAvatar
									size={"sm"}
									user={{
										name: freeDate.tastemaker.user.name,
										avatar: freeDate.tastemaker.user.profile?.avatar,
									}}
								/>
								<p className={css({ color: "grayText" })}>
									{freeDate.tastemaker.user.name}
								</p>
							</HStack>
						</VStack>
					</VStack>
					<div
						className={css({
							display: "flex",
							width: "100%",
							justifyContent: "center",
						})}
					>
						<IoIosCheckmarkCircleOutline
							className={css({ color: "primary" })}
							size={30}
						/>
					</div>
					<p
						className={css({
							textStyle: "paragraph",
							fontWeight: "bold",
							textAlign: "center",
						})}
					>
						You successfully created your date! Make sure to share it.
					</p>
					<CopyLinkShareButton campaign={campaign} css={{ width: "100%" }} />
					<FacebookShareButton campaign={campaign} css={{ width: "100%" }} />
					<TwitterShareButton campaign={campaign} css={{ width: "100%" }} />
				</VStack>
			</div>
		</div>
	)
}
