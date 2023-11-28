function isBrowser() {
	return typeof window !== "undefined" || typeof document !== "undefined"
}

export function getEnv() {
	return isBrowser() ? window.ENV : process.env
}
