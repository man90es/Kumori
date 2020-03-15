const config = require('../../config')

const WS = new WebSocket(config['APIServer'])

let ready = false
WS.onopen = () => ready = true
WS.onclose = () => ready = false
window.onbeforeunload = () => WS.close()

function request(req) {
	return new Promise((resolve, reject) => {
		WS.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data)

			let match = true
			Object.keys(req).forEach((key) => {
				if (req[key] !== msg.what[key]) {
					match = false
				}
			})

			if (match) {
				if('error' in msg) {
					reject(msg.error)
				} else {
					resolve(msg.data)
				}
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
		return request({request: 'sync', type})
	},

	getBoards: () => {
		return request({request: 'boards'})
	}
}


