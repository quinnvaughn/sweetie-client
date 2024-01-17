import { flex } from "~/styled-system/patterns"
import { Logo } from "../../logo"
import { HamburgerDropdown } from "./hamburger-dropdown"
import { LoggedInActions } from "./logged-in-actions"
import { MobileDropdown } from "./mobile-dropdown"
import { MobileHamburger } from "./mobile-hamburger"
import { NavbarButtonAsLink } from "./navbar-button"
import { NavbarDropdown } from "./navbar-dropdown"
import { NavbarLink } from "./navbar-link"
import { NotLoggedInActions } from "./not-logged-in-actions"

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export default function Navbar({ children }: Props) {
	return (
		<nav
			className={flex({
				padding: "16px",
				alignItems: "center",
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "gray",
			})}
		>
			{children}
		</nav>
	)
}

Navbar.Link = NavbarLink
Navbar.Dropdown = NavbarDropdown
Navbar.Logo = Logo
Navbar.ButtonAsLink = NavbarButtonAsLink
Navbar.Hamburger = MobileHamburger
Navbar.HamburgerDropdown = HamburgerDropdown
Navbar.LoggedInActions = LoggedInActions
Navbar.NotLoggedInActions = NotLoggedInActions
Navbar.MobileDropdown = MobileDropdown
