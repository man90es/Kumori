export processMarkup from './markup'

export function num2Word(n, words) {
	if (words.length < 3) words[2] = words[1]
	let t = n % 100
	if (n > 19) t %= 10
	
	switch (t) {
		case 1:
			return words[0]
		case 2:
		case 3:
		case 4:
			return words[1]
		default:
			return words[2]
	}
}

export function	truncateString(string, targetLength) {
	if (string.length <= targetLength) return string

	let charsToShow = targetLength - 3,
	frontChars = Math.ceil(charsToShow / 2),
	backChars = Math.floor(charsToShow / 2)

	return string.substr(0, frontChars) + "..." + string.substr(string.length - backChars)
}
