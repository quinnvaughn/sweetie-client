import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	heading: string
	children: React.ReactNode | React.ReactNode[]
}

export function ProfileSection({ heading, children }: Props) {
	return (
		<div
			className={css({
				// do not need these yet.
				// borderBottom: "1px solid",
				// borderBottomColor: "gray",
				// paddingBottom: "16px",
				width: "100%",
			})}
		>
			<VStack gap={4} alignItems="flex-start" width={"100%"}>
				<h3 className={css({ textStyle: "paragraph", fontWeight: "700" })}>
					{heading}
				</h3>
				{children}
			</VStack>
		</div>
	)
}
