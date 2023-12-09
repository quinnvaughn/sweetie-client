import { useLocation } from "@remix-run/react"
import { createContext, useEffect, useState } from "react"

export const RouterContext = createContext({ to: "", from: "" })

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export const RouterProvider = ({ children }: Props) => {
	const location = useLocation()
	const [route, setRoute] = useState({
		//--> it can be replaced with useRef or localStorage
		to: location.pathname,
		from: location.pathname,
	})

	useEffect(() => {
		setRoute((prev) => ({ to: location.pathname, from: prev.to }))
	}, [location])

	return (
		<RouterContext.Provider value={route}>{children}</RouterContext.Provider>
	)
}
