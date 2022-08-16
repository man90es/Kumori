const reduceNewLines = 4 // 4 = 1 + 3: 1 line break and 3 empty lines
const escapeMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&apos;",
	"*": "&#42;",
	"_": "&#95;",
	"[": "&#91;",
	"]": "&#93;",
	"%": "&#37;",
	"&gt;": "&#62;",
	"~": "&#126;",
	"/": "&#47;",
	":": "&#58;",
	".": "&#46;",
	"#": "&#35;",
}

function escapeHTML(text) {
	return text.trim().replace(/[&<>""]/g, (m) => escapeMap[m])
}

function escapeRX(exp) {
	return exp.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
}

let tagMap = {
	code: [
		/\[code](?:\s*)([\s\S]+?)(?:\s*)\[\/code]/gi,
		/```(?:\s*)([\s\S]+?)(?:\s*)```/gi,
	],
	monospace: [
		/`(.+?)`/gim,
	],
	postLink: [
		/&gt;&gt;(\/?.+\/)?([0-9]+)/gi,
	],
	quotation: [
		/^(&gt;(?!&gt;).+)$/gim,
	],
	bold: [
		["[b]", "[/b]"],
		["**", "**"],
	],
	italic: [
		["[i]", "[/i]"],
		["_", "_"],
	],
	strikethrough: [
		["[s]", "[/s]"],
		["~~", "~~"],
	],
	titledLink: [
		/\[(.+?)]\((.+?)\)/g,
	],
	link: [
		["[url]", "[/url]"],
		/((?:https?|s?ftp):\/\/[a-z0-9\-.]+\/?(?:(?!%%|\[\/|\s|<\/|" ).)*)/gi,
	],
	spoiler: [
		/\[spoiler]([\s\S]+?)\[\/spoiler]/gi,
		/%%([\s\S]+?)%%/gi,
	],
	newLine: [
		/\r?\n/g,
	],
	reduceNewLines: [
		new RegExp(`(<br>){${reduceNewLines},}`, "gi"),
	],
}

const typeMap = {
	code: processCode("<pre><code>${text}</code></pre>"),
	monospace: processCode("<code>${text}</code>"),
	postLink: processPostLink,
	quotation: processText("<q>${text}</q>"),
	bold: processText("<b>${text}</b>"),
	italic: processText("<i>${text}</i>"),
	strikethrough: processText("<s>${text}</s>"),
	titledLink: processLink,
	link: processLink,
	spoiler: processText("<span class='spoiler'>${text}</span>"),
	newLine: processText("<br>"),
	reduceNewLines: new Array(reduceNewLines + 1).join("${text}"),
}

function getMatches(string, regex) {
	const capture = []
	const matches = []
	let match

	// eslint-disable-next-line no-cond-assign
	while (match = regex.exec(string)) {
		capture.push(match.shift())
		matches.push(match)
	}

	return { capture, matches }
}

function processCode(tagString) { // escape a few chars to avoid further replacements
	return (_, matches) => {
		const code = matches[0].replace(/[*_[\]%~/:.#]/g, m => escapeMap[m])
		return tagString.replace(/\${text}/g, code)
	}
}

function processText(tagString) {
	return (_, matches) => {
		return tagString.replace(/\${text}/g, matches[0])
	}
}

function processPostLink(capture, matches) {
	let [boardFromMatch, postFromMatch] = matches
	let boardName = boardFromMatch ? boardFromMatch.replace(/\//g, "") : ""

	capture = capture.replace(/&gt;/g, ">")
	return `<a class="postLink" onmouseover="emitter.emit('post-link-hovered', this)" onclick="emitter.emit('post-link-clicked', this)" data-board="${boardName}" data-number="${postFromMatch}">${capture}</a>`
}

function processLink(_, matches) {
	let uri = matches[0],
		title = matches[1] || uri

	if (!/^(https?|s?ftp):\/\//.test(uri)) {
		uri = `https://${uri}`
	}

	uri = uri.replace(/[*_[\]%~/:.#]/g, (m) => escapeMap[m])

	return `<a onclick="emitter.emit('unsafe-link-click', { link: '${uri}' })" title="${uri}">${title}</a>`
}

export default function processMarkup(text) {
	if (!text) return ""

	// Step 0.
	text = escapeHTML(text)

	// Step 1. Bypass code tags.
	// Step 2. Replace other tags.
	const tagTypes = Object.keys(tagMap); // select tag types and their template strings
	for (let i = 0; i < tagTypes.length; i++) {
		const tagType = tagTypes[i] // bold, italic, underline...
		let tags = tagMap[tagType]

		for (let j = 0; j < tags.length; j++) {
			if (!Array.isArray(tags[j])) {
				tags[j] = [tags[j]];
			}

			let [opening, closing = opening, params = "gi"] = tags[j] // create regexp or get it
			let regex = (opening instanceof RegExp)
				? opening
				: new RegExp(escapeRX(opening) + "(.+?)" + escapeRX(closing), params)

			if (typeof typeMap[tagType] === "function") {
				let { matches, capture } = getMatches(text, regex)
				for (let k = 0; k < capture.length; k++) {
					text = text.replace(capture[k], typeMap[tagType](capture[k], matches[k]))
				}
				continue
			}
			text = text.replace(regex, typeMap[tagType])
		}
	}

	return text
}
