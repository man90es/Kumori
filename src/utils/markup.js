let markup = {}
const reduceNewLines = 4 // 4 = 1 + 3: 1 line break and 3 empty lines

let escapeMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;',

	'*': '&#42;',
	'_': '&#95;',
	'[': '&#91;',
	']': '&#93;',
	'%': '&#37;',
	'&gt;': '&#62;',
	'~': '&#126;',
	'/': '&#47;',
	':': '&#58;',
	'.': '&#46;',
	'#': '&#35;',
}

function escapeHTML(text) {
	return text.trim().replace(/[&<>"']/g, (m) => escapeMap[m])
}

function escapeRX(exp) {
	return exp.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, "\\$&")
}

let tagMap = {
	code: [
		/\[code](?:\s*)([\s\S]+?)(?:\s*)\[\/code]/gi,
		/```(?:\s*)([\s\S]+?)(?:\s*)```/gi,
	],
	inlineCode: [
		/`(.+?)`/gim,
	],
	postLink: [
		/&gt;&gt;(\/?.+\/)?([0-9]+)/gi,
	],
	quotation: [
		/^(&gt;(?!&gt;).+)$/gim,
	],
	bold: [
		['[b]', '[/b]'],
		['**', '**'],
		['__', '__'],
	],
	italic: [
		['[i]', '[/i]'],
		['*', '*'],
		['_', '_'],
	],
	underline: [
		['[u]', '[/u]'],
		['~', '~'],
	],
	strike: [
		['[s]', '[/s]'],
		['~~', '~~'],
	],
	titledLink: [
		/\[(.+?)]\((.+?)\)/g,
	],
	link: [
		['[url]', '[/url]'],
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
		new RegExp(`(<br \/>){${reduceNewLines},}`, 'gi'),
	],
}

let typeMap = {
	code: processCode('<pre><code>$1</code></pre>'),
	inlineCode: processCode('<code>$1</code>'),
	postLink: processPostLink,
	quotation: '<q>$1</q>',
	bold: '<b>$1</b>',
	italic: '<i>$1</i>',
	underline: '<u>$1</u>',
	strike: '<s>$1</s>',
	titledLink: processURL('<a data-link="$1" title="$1">$2</a>'),
	link: processURL('<a data-link="$1" title="$1">$1</a>'),
	spoiler: '<span class="spoiler">$1</span>',
	newLine: '<br />',
	reduceNewLines: new Array(reduceNewLines + 1).join('$1'),
}

function getMatches(string, regex) {
	let capture = []
	let matches = []
	let match

	while (match = regex.exec(string)) {
		capture.push(match.shift())
		matches.push(match)
	}

	return {capture, matches}
}

function processCode(tagString) { // escape a few chars to avoid further replacements
	return (_, matches) => {
		let code = matches[0].replace(/[*_\[\]%~/:.#]/g, m => escapeMap[m])
		return tagString.replace('$1', code)
	}
}

async function processPostLink(capture, matches) {
	let [boardFromMatch, postFromMatch] = matches
	let boardName = boardFromMatch ? boardFromMatch.replace(/\//g, '') : ''

	capture = capture.replace(/&gt;/g, '>')
	return `<a class="postLink" data-board="${boardName}" data-number="${postFromMatch}">${capture}</a>`
}

function processURL(tagString) {
	return (capture, matches) => {
		let title, href

		if (capture.startsWith('[url]')) { // [url]href[/url]
			matches = getMatches(capture, /((?:https?|s?ftp):\/\/[a-z0-9\-.]+\/?(?:(?!%%|\[\/|\s|<\/|" ).)*)/gi).matches[0]
		}

		if (matches.length == 2){ // [title](url)
			[title, href] = matches
		} else {
			[href] = matches
		}

		href = href.replace(/[*_\[\]%~/:.#]/g, (m) => escapeMap[m])

		try {
			href = decodeURIComponent(href)
		} catch (e) {
			console.log(e, href)
		}

		return tagString.replace(/\$1/g, href).replace('$2', title)
	}
}

export default async function processMarkup(text) {
	if (!text) return ''

	// Step 0.
	text = escapeHTML(text)

	// Step 1. Bypass code tags.
	// Step 2. Replace other tags.
	let tagTypes = Object.keys(tagMap); // select tag types and their template strings
	for (let i = 0; i < tagTypes.length; i++) {
		let tagType = tagTypes[i] // bold, italic, underline...
		let tags = tagMap[tagType]
		for (let j = 0; j < tags.length; j++) {
			if (!Array.isArray(tags[j])) {
				tags[j] = [ tags[j] ];
			}

			let [opening, closing = opening, params = 'gi'] = tags[j] // create regexp or get it
			let regex = (opening instanceof RegExp)
				? opening
				: new RegExp(escapeRX(opening) + '(.+?)' + escapeRX(closing), params)

			if (typeof typeMap[tagType] === 'function') {
				let {matches, capture} = getMatches(text, regex)
				for (let k = 0; k < capture.length; k++) {
					text = text.replace(capture[k], await typeMap[tagType](capture[k], matches[k]))
				}
				continue
			}
			text = text.replace(regex, typeMap[tagType])
		}
	}

	return text
}