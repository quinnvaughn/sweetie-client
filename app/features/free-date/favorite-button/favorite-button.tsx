import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io/index.js"
import { $path } from "remix-routes"
import { GetUserToSignUpModal, SignupModal } from "~/features/ui"
import { useToast } from "~/hooks"
import { action } from "~/routes/api.toggle-favorite"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	favorited: boolean
	title: string
	id: string
}

export function FavoriteButton({ favorited, title, id }: Props) {
	const fetcher = useFetcher<typeof action>()

	const { error, success } = useToast()
	const [open, setOpen] = useState(false)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fetcher.data?.success === false && fetcher.data?.message) {
			error(fetcher.data.message)
		}
		if (fetcher.data?.success === true && fetcher.data.type) {
			success(`${fetcher.data.type === "saved" ? "Saved" : "Removed"} ${title}`)
		}
		if (fetcher.data?.signup) {
			// open auth modal
			setOpen(true)
		}
	}, [fetcher.data])

	function favoriteDate() {
		fetcher.submit(
			{ id },
			{ action: $path("/api/toggle-favorite"), method: "post" },
		)
	}

	return (
		<>
			<button
				onClick={favoriteDate}
				type="button"
				className={css({
					textDecoration: "underline",
					fontWeight: "bold",
					padding: "8px",
					borderRadius: "8px",
					_hover: {
						backgroundColor: "rgba(0,0,0,0.05)",
						cursor: "pointer",
					},
				})}
			>
				<HStack gap={2}>
					{favorited ? (
						<IoMdHeart size="24px" className={css({ color: "secondary" })} />
					) : (
						<IoIosHeartEmpty size={20} className={css({ color: "black" })} />
					)}
					<span>{favorited ? "Saved" : "Save"}</span>
				</HStack>
			</button>
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
