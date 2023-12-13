import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io/index.js"
import { css } from "~/styled-system/css"

type Props = {
	onClick: () => void
	favorited: boolean
}

export function FavoriteIcon({ onClick, favorited }: Props) {
	return (
		<button
			type="button"
			className={css({
				position: "absolute",
				top: "12px",
				right: "12px",
				cursor: "pointer",
				backgroundColor: "transparent",
			})}
			onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				onClick()
			}}
		>
			{favorited ? (
				<IoMdHeart size={30} className={css({ color: "secondary" })} />
			) : (
				<IoIosHeartEmpty size={30} color="white" />
			)}
		</button>
	)
}
