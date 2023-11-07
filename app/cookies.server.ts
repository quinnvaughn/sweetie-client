import { createCookie } from "@remix-run/node"

export const showShareScreen = createCookie("show-share-screen", {
	maxAge: 60 * 10, // 10 minutes
})
