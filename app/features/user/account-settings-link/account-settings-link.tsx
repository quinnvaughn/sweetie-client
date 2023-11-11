import { Link } from "@remix-run/react"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	to: string
	title: string
	description: string
	icon: React.ReactNode
}

export function AccountSettingsLink({ to, title, description, icon }: Props) {
	return (
		<Link
			className={css({
				border: "1px solid",
				borderColor: "gray",
				padding: "16px",
				borderRadius: "8px",
				textDecoration: "none",
			})}
			to={to}
		>
			<VStack gap={6} alignItems="flex-start">
				{icon}
				<VStack gap={2} alignItems="flex-start">
					<h3
						className={css({
							fontSize: "18px",
							fontWeight: "bold",
							textStyle: "paragraph",
						})}
					>
						{title}
					</h3>
					<p
						className={css({
							textStyle: "paragraph",
							fontSize: "14px",
							color: "grayText",
						})}
					>
						{description}
					</p>
				</VStack>
			</VStack>
		</Link>
	)
}
