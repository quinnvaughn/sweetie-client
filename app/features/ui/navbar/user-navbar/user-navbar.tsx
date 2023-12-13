import { useState } from "react"
import { match } from "ts-pattern"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"
import { Navbar } from "../navbar"

export function UserNavbar() {
	const { isLoggedIn } = useViewer()
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Navbar>
			<HStack flex={1} gap="1" justifyContent={"space-between"}>
				<Navbar.Logo />
				{/** Desktop */}
				<div className={css({ display: { base: "none", md: "block" } })}>
					{match(isLoggedIn())
						.with(false, () => (
							<HStack gap="4" alignItems="center">
								<Navbar.NotLoggedInActions />
							</HStack>
						))
						.with(true, () => (
							<HStack gap="4" alignItems="center">
								<Navbar.LoggedInActions />
							</HStack>
						))
						.exhaustive()}
				</div>
				{/** Mobile */}
				<div className={css({ display: { base: "block", md: "none" } })}>
					<Navbar.Hamburger setIsOpen={setIsOpen}>
						{isOpen && (
							<Navbar.HamburgerDropdown>
								<VStack gap={2}>
									{match(isLoggedIn())
										.with(true, () => <Navbar.LoggedInActions />)
										.with(false, () => <Navbar.NotLoggedInActions />)
										.exhaustive()}
								</VStack>
							</Navbar.HamburgerDropdown>
						)}
					</Navbar.Hamburger>
				</div>
			</HStack>
		</Navbar>
	)
}
