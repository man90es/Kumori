import { getCodeRenderer, getTextRenderer, getLinkRenderer, getPostLinkRenderer } from "./renderers"

const reduceNewlines = 4 // 4 = 1 + 3: 1 line break and 3 empty lines

const config: ({ tags: (RegExp | [string, string])[], renderer: (arg0: string, arg1: string[]) => string })[] = [
	{ // Bold
		tags: [
			["__", "__"],
			["[b]", "[/b]"],
			["**", "**"],
		],
		renderer: getTextRenderer("<b>${text}</b>"),
	},
	{ // Code
		tags: [
			/\[code](?:\s*)([\s\S]+?)(?:\s*)\[\/code]/gi,
			/```(?:\s*)([\s\S]+?)(?:\s*)```/gi,
		],
		renderer: getCodeRenderer("<pre><code>${text}</code></pre>"),
	},
	{ // Italic
		tags: [
			["_", "_"],
			["[i]", "[/i]"],
			["*", "*"],
		],
		renderer: getTextRenderer("<i>${text}</i>"),
	},
	{ // Link
		tags: [
			["[url]", "[/url]"],
			/((?:https?|s?ftp):\/\/[a-z0-9\-.]+\/?(?:(?!%%|\[\/|\s|<\/|" ).)*)/gi,
		],
		renderer: getLinkRenderer(),
	},
	{ // Monospace
		tags: [
			/`(.+?)`/gim,
		],
		renderer: getCodeRenderer("<code>${text}</code>"),
	},
	{ // Line break
		tags: [
			/\r?\n/g,
		],
		renderer: getTextRenderer("<br>"),
	},
	{ // Post link
		tags: [
			/&gt;&gt;(\/?.+\/)?([0-9]+)/gi,
		],
		renderer: getPostLinkRenderer(),
	},
	{ // Quote
		tags: [
			/^(&gt;(?!&gt;).+)$/gim,
		],
		renderer: getTextRenderer("<q>${text}</q>"),
	},
	{ // Reduce line breaks
		tags: [
			new RegExp(`(<br>){${reduceNewlines},}`, "gi"),
		],
		renderer: () => new Array(reduceNewlines + 1).join("${text}"),
	},
	{ // Spoiler
		tags: [
			/\[spoiler]([\s\S]+?)\[\/spoiler]/gi,
			/%%([\s\S]+?)%%/gi,
		],
		renderer: getTextRenderer("<span class='spoiler'>${text}</span>"),
	},
	{ // Strikethrough
		tags: [
			["[s]", "[/s]"],
			["~~", "~~"],
		],
		renderer: getTextRenderer("<s>${text}</s>"),
	},
	{ // Link with title
		tags: [
			/\[(.+?)]\((.+?)\)/g,
		],
		renderer: getLinkRenderer(),
	},
]

export default config
