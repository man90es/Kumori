import { escapeCode } from "./escape"

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

		const a = document.createElement("a")
		a.className = "postLink"
		a.dataset.boardName = boardName
		a.dataset.number = postFromMatch
		a.innerText = capture
		a.setAttribute("onclick", "emitter.emit('post-link-clicked', this)")
		a.setAttribute("onmouseover", "emitter.emit('post-link-hovered', this)")

		return a.outerHTML
	}
}

export function getLinkRenderer() {
	return (_: string, matches: string[]) => {
		let uri = matches[0]
		const title = matches[1] || uri

		// Add https schema prefix if schema is not specified
		if (!/^(https?|s?ftp):\/\//.test(uri)) {
			uri = `https://${uri}`
		}

		const a = document.createElement("a")
		a.innerText = title
		a.setAttribute("onclick", `emitter.emit('unsafe-link-click', { link: "${uri}" })`)
		a.title = uri

		return a.outerHTML
	}
}
