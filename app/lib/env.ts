function isBrowser() {
	return typeof window !== "undefined"
}

export function getEnv() {
	return isBrowser() ? window.ENV : process.env
}
