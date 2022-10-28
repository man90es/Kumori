import { escapeCode, escapeURI } from "./escape"

export function getCodeRenderer(tagString: string) { // escape a few chars to avoid further replacements
	return (_: string, matches: string[]) => {
		const code = escapeCode(matches[0])
		return tagString.replace(/\${text}/g, code)
	}
}

export function getTextRenderer(tagString: string) {
	return (_: string, matches: string[]) => (
		tagString.replace(/\${text}/g, matches[0])
	)
}

export function getPostLinkRenderer() {
	return (capture: string, [boardFromMatch, postFromMatch]: string[]) => {
		const boardName = boardFromMatch ? boardFromMatch.replace(/\//g, "") : ""

		capture = capture.replace(/&gt;/g, ">")
		return `
			<a
				class="postLink"
				onmouseover="emitter.emit('post-link-hovered', this)"
				onclick="emitter.emit('post-link-clicked', this)"
				data-board="${boardName}"
				data-number="${postFromMatch}"
			>
				${capture}
			</a>
		`
	}
}

export function getLinkRenderer() {
	return (_: string, matches: string[]) => {
		let uri = matches[0]
		const title = matches[1] || uri

		if (!/^(https?|s?ftp):\/\//.test(uri)) {
			uri = `https://${uri}`
		}

		uri = escapeURI(uri)

		return `
			<a
				onclick="emitter.emit('unsafe-link-click', { link: '${uri}' })"
				title="${uri}"
			>
				${title}
			</a>
		`
	}
}
