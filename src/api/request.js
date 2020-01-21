const config = require('../../config')
const reshaper = require('./reshaper')

let request = module.exports = {}

const WS = new WebSocket(config['APIServer'])

let ready = false

WS.onopen = () => {
	ready = true
}

WS.onclose = () => {
	ready = false
}

window.onbeforeunload = () => {
	WS.close()
}

WS.onmessage = (message) => {
	let data = JSON.parse(message.data)

	if (data.threads === undefined) {
		let detail = reshaper.readBoards(data)
		document.dispatchEvent(new CustomEvent('readBoards', {detail}))
	} else {
		let detail = reshaper.readThreads(data)
		document.dispatchEvent(new CustomEvent('readThreads', {detail}))
	}
}

function command(cmd) {
	if (ready) {
		WS.send(cmd)
	} else {
		WS.addEventListener('open', () => {
			WS.send(cmd)
		})
	}
}

request.readBoards = () => {
	command('GET BOARDS')
}

request.readThreads = (category, board) => {
	command(`BOARD ${board} 0 14 3 0`)
}