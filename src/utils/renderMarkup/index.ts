import { escapeRX, escapeHTML } from "./escape"
import config from "./config"

function getMatches(str: string, regex: RegExp): { capture: string[], matches: RegExpExecArray[] } {
	const capture: string[] = []
	const matches: RegExpExecArray[] = []
	let match

	// eslint-disable-next-line no-cond-assign
	while (match = regex.exec(str)) {
		capture.push(match.shift() as string)
		matches.push(match)
	}

	return { capture, matches }
}

export default function renderMarkup(text: string) {
	if (!text) {
		return ""
	}

	text = escapeHTML(text)

	for (const { tags, renderer } of config) {
		for (let j = 0; j < tags.length; ++j) {
			// Get the regular expression or generate it from provided tags
			let regex: RegExp
			if (tags[j] instanceof RegExp) {
				regex = tags[j] as RegExp
			} else {
				const [open, close = open] = tags[j] as [string, string]
				regex = new RegExp(escapeRX(open) + "(.+?)" + escapeRX(close), "gi")
			}

			const { matches, capture } = getMatches(text, regex)
			for (const k in capture) {
				const cap = capture[k]
				text = text.replace(cap, renderer(cap, matches[k]))
			}
		}
	}

	return text
}
