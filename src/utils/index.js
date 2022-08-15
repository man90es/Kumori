export { default as processMarkup } from "./markup"
export { default as Logger } from "./Logger"

export function truncateString(string, targetLength) {
	if (string.length <= targetLength) return string

	const charsToShow = targetLength - 3,
		frontChars = Math.ceil(charsToShow / 2),
		backChars = Math.floor(charsToShow / 2)

	return string.substr(0, frontChars) + "..." + string.substr(string.length - backChars)
}

export function wait(delay) {
	return new Promise(resolve => setTimeout(resolve, delay))
}

export function capitalise(string) {
	return string[0].toUpperCase() + string.slice(1)
}

export function getProps(source = {}, keys = []) {
	const result = {}

	for (const key of keys) {
		result[key] = source[key]
	}

	return result
}
