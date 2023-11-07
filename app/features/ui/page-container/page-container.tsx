import { css } from "~/styled-system/css"
// import { Footer } from "../footer"
import { UserNavbar } from "../navbar"
import { Footer } from ".."
// import { AdminNavbar } from "@/features/admin"

type BreakpointOptions = {
	base?: string | number
	sm?: string | number
	md?: string | number
	lg?: string | number
	xl?: string | number
	"2xl"?: string | number
}

type Props = {
	width?: BreakpointOptions
	padding?: BreakpointOptions
	children: React.ReactNode | React.ReactNode[]
	ignorePadding?: JSX.Element
	tastemaker?: boolean
	dates?: boolean
	admin?: boolean
}

export function PageContainer(props: Props) {
	return (
		<>
			{/* {props.dates ? (
				// <DatesNavbar />
			) : props.tastemaker ? ( */}
			{/* {props.admin ? (
				<AdminNavbar />
			) : props.tastemaker ? (
				<TastemakerNavbar />
			) : (
				<UserNavbar />
			)} */}
			<UserNavbar />
			{props.ignorePadding}
			<div
				className={css({
					flex: 1,
					width: "100%",
					display: "flex",
					justifyContent: "center",
				})}
			>
				<div
					className={css({
						width: {
							base: props.width?.base ?? "100%",
							sm: props.width?.sm,
							md: props.width?.md,
							lg: props.width?.lg,
							xl: props.width?.xl,
							"2xl": props.width?.["2xl"],
						},
						padding: {
							base: props.padding?.base ?? "0px",
							sm: props.padding?.sm,
							md: props.padding?.md,
							lg: props.padding?.lg,
							xl: props.padding?.xl,
							"2xl": props.padding?.["2xl"],
						},
					})}
				>
					{props.children}
				</div>
			</div>
			<Footer />
		</>
	)
}
