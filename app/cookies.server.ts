import { createCookie } from "@remix-run/node"

export const showShareScreen = createCookie("show-share-screen", {
	maxAge: 60 * 10, // 10 minutes
})

export const signupModal = createCookie("signup-modal", {
	maxAge: 60 * 60 * 24 * 365, // 1 year
})

export const timesLookedAtDates = createCookie("times-looked-at-dates", {
	maxAge: 60 * 60 * 24 * 365, // 1 year
})

export const showSignupModal = createCookie("show-signup-modal", {
	maxAge: 60 * 60 * 24 * 365, // 1 year
})

export const clearedSignupModal = createCookie("cleared-signup-modal", {
	maxAge: 60 * 60 * 24 * 365, // 1 year
})

export function clearCookie(name: string) {
	return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=1; Expires=${new Date(
		"01/01/2000",
	).toUTCString()};`
}
