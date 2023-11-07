import { P, match } from "ts-pattern"
import { css, cva } from "~/styled-system/css"

const image = cva({
	base: {
		objectFit: "cover",
		borderRadius: "50%",
		bgColor: "gray",
	},
	variants: {
		size: {
			sm: {
				width: "24px",
				height: "24px",
			},
			md: {
				width: "40px",
				height: "40px",
			},
			lg: {
				width: "56px",
				height: "56px",
			},
		},
	},
	defaultVariants: {
		size: "sm",
	},
})

type Props = {
	size?: "sm" | "md" | "lg"
	user: {
		name: string
		avatar?: string | null
	}
}

export function UserAvatar({ user, size = "md" }: Props) {
	return match(user.avatar)
		.with(P.string, (avatar) => (
			<img className={image({ size })} alt={"User avatar"} src={avatar} />
		))
		.with(P.nullish, () => (
			<div
				className={css(image.raw({ size }), {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				})}
			>
				<p
					className={css({
						fontSize:
							(16 * (size === "sm" ? 24 : size === "md" ? 40 : 56)) / 40,
						fontWeight: "bold",
						color: "white",
					})}
				>
					{user.name[0]}
				</p>
			</div>
		))
		.exhaustive()
}
