import { Link } from "@remix-run/react"
import React from "react"
import { FiChevronRight } from "react-icons/fi/index.js"
import { css } from "~/styled-system/css"
import { HStack } from "~/styled-system/jsx"

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export function Breadcrumbs({ children }: Props) {
	return (
		<HStack gap={4} alignItems="center">
			{React.Children.map(children, (child, index) => {
				if (index !== React.Children.count(children) - 1) {
					return (
						<>
							{child}
							<FiChevronRight className={css({ color: "#484848" })} size={14} />
						</>
					)
				}
				return child
			})}
		</HStack>
	)
}

type LinkProps = {
	to: string
	text: string
}

function BreadcrumbLink({ to, text }: LinkProps) {
	return (
		<Link
			className={css({
				fontSize: "14px",
				color: "#484848",
				fontWeight: "bold",
				_hover: { textDecoration: "underline" },
			})}
			to={to}
		>
			{text}
		</Link>
	)
}

BreadcrumbLink.displayName = "BreadcrumbLink"
Breadcrumbs.Link = BreadcrumbLink

function BreadcrumCurrentPage({ text }: { text: string }) {
	return (
		<p
			className={css({
				textStyle: "paragraph",
				fontSize: "14px",
				fontWeight: "bold",
				color: "#484848",
			})}
		>
			{text}
		</p>
	)
}

BreadcrumCurrentPage.displayName = "BreadcrumCurrentPage"
Breadcrumbs.CurrentPage = BreadcrumCurrentPage
