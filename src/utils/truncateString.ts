export default function truncateString(str: string, targetLength: number, padding: string = "..."): string {
	if (str.length <= targetLength) {
		return str
	}

	const charsToShow = targetLength - 3
	const frontChars = Math.ceil(charsToShow / 2)
	const backChars = Math.floor(charsToShow / 2)

	return [str.substring(0, frontChars), str.substring(str.length - backChars)].join(padding)
}
