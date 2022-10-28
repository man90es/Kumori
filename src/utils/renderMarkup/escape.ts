const escapeMap: { [key: string]: string } = {
	"_": "&#95;",
	":": "&#58;",
	".": "&#46;",
	"'": "&apos;",
	"[": "&#91;",
	"]": "&#93;",
	"*": "&#42;",
	"/": "&#47;",
	"\"": "&quot;",
	"&": "&amp;",
	"&gt;": "&#62;",
	"#": "&#35;",
	"%": "&#37;",
	"<": "&lt;",
	">": "&gt;",
	"~": "&#126;",
}

export function escapeHTML(text: string): string {
	return text.trim().replace(/[&<>""]/g, m => escapeMap[m])
}

export function escapeRX(exp: string): string {
	return exp.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
}

export function escapeURI(uri: string): string {
	return uri.replace(/[*_[\]%~/:.#]/g, m => escapeMap[m])
}

export function escapeCode(code: string): string {
	return code.replace(/[*_[\]%~/:.#]/g, m => escapeMap[m])
}
