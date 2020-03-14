const config = require('../../config')

const WS = new WebSocket(config['APIServer'])

let ready = false
WS.onopen = () => ready = true
WS.onclose = () => ready = false
window.onbeforeunload = () => WS.close()

function request(req, expect) {
	return new Promise((resolve, reject) => {
		WS.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data)

			if (msg.request == expect.request) {
				resolve(msg.data)
			}
		})

		if (ready) {
			WS.send(JSON.stringify(req))
		} else {
			WS.addEventListener('open', () => {
				WS.send(JSON.stringify(req))
			})
		}
	})
}

module.exports = {
	sync: (type) => {
		return request({request: 'sync', type}, {request: 'sync'})
	},

	getBoards: () => {
		return request({request: 'boards'}, {request: 'boards'})
	}
}


