export function serverOrClient<T>(server: T, client: T) {
	return typeof window === "undefined" ? server : client
}
