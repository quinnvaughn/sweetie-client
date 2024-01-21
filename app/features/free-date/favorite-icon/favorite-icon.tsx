import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io/index.js"
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
				backgroundColor: "white",
				padding: "4px",
				borderRadius: "50%",
			})}
			onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				onClick()
			}}
		>
			{favorited ? (
				<IoIosHeart size={24} className={css({ color: "secondary" })} />
			) : (
				<IoIosHeartEmpty
					size={24}
					strokeWidth={"2px"}
					className={css({ color: "secondary" })}
				/>
			)}
		</button>
	)
}
