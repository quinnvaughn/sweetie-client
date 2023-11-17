import { Link } from "@remix-run/react"
import { $path } from "remix-routes"
import { FreeDateCardFragment } from "~/graphql/generated"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"
import { FreeDateCard } from ".."

type Props = {
	date: FreeDateCardFragment
}

export function EditFreeDate({ date }: Props) {
	return (
		<VStack gap={2} alignItems="flex-end">
			<Link
				className={css({
					fontWeight: "bold",
					_hover: { textDecoration: "underline" },
					textStyle: "paragraph",
				})}
				to={$path("/free-date/edit/:id", { id: date.id })}
			>
				Edit
			</Link>
			<FreeDateCard date={date} />
		</VStack>
	)
}
