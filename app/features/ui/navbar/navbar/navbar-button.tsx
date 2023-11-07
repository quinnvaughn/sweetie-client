import { useFetcher } from "@remix-run/react"
import { css } from "~/styled-system/css"

type Props = {
	action: string
	text: string
}

export function NavbarButtonAsLink({ action, text }: Props) {
	const fetcher = useFetcher()
	return (
		<fetcher.Form method="post" action={action}>
			<button
				type="submit"
				className={css({
					backgroundColor: "transparent",
					border: "none",
					cursor: "pointer",
					color: "black",
					fontWeight: 600,
					textAlign: "left",
					whiteSpace: "nowrap",
					_hover: {
						color: "secondary",
						filter: "brightness(150%)",
					},
				})}
			>
				{text}
			</button>
		</fetcher.Form>
	)
}
