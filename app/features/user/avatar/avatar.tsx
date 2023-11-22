import { P, match } from "ts-pattern"
import { Image } from "~/features/ui"
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
			xl: {
				width: "72px",
				height: "72px",
			},
			"2xl": {
				width: "96px",
				height: "96px",
			},
		},
	},
	defaultVariants: {
		size: "sm",
	},
})

const placeholder = cva({
	base: {
		fontWeight: "bold",
		color: "white",
	},
	variants: {
		size: {
			sm: {
				fontSize: `${(16 * 24) / 30}px`,
			},
			md: {
				fontSize: `${(16 * 40) / 30}px`,
			},
			lg: {
				fontSize: `${(16 * 56) / 30}px`,
			},
			xl: {
				fontSize: `${(16 * 72) / 30}px`,
			},
			"2xl": {
				fontSize: `${(16 * 96) / 30}px`,
			},
		},
	},
})

type Props = {
	size?: "sm" | "md" | "lg" | "xl" | "2xl"
	user: {
		name: string
		avatar?: string | null
	}
}

export function UserAvatar({ user, size = "md" }: Props) {
	return match(user.avatar)
		.with(P.string, (avatar) => (
			<Image cva={image({ size })} alt={"User avatar"} src={avatar} />
		))
		.with(P.nullish, () => (
			<div
				className={css(image.raw({ size }), {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				})}
			>
				<p className={placeholder({ size })}>{user.name[0]}</p>
			</div>
		))
		.exhaustive()
}
