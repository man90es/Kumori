import { APIServer } from '../../config'

export const request = {
	meta: null,
	wsGate: null,
	ready: false,

	init: function(messageHandler) {
		let xhr = new XMLHttpRequest()
		xhr.open('GET', `${APIServer}/api/meta`)

		xhr.onload = () => {
			if (xhr.status == 200) {
				this.meta = JSON.parse(xhr.response)
				this.wsGate = new WebSocket(this.meta.ws)

				this.wsGate.onopen = () => this.ready = true
				this.wsGate.onclose = () => this.ready = false
				window.onbeforeunload = () => this.wsGate.close()

				this.wsGate.addEventListener('message', (message) => {
					messageHandler(JSON.parse(message.data))
				})
			}
		}

		xhr.send(null)
	},

	ws: function(req) {
		let i = setInterval(() => {
			if (this.wsGate == null) {
				return
			} else {
				clearInterval(i)
			}
			
			if (this.ready) {
				this.wsGate.send(JSON.stringify(req))
			} else {
				this.wsGate.addEventListener('open', () => {
					this.wsGate.send(JSON.stringify(req))
				})
			}
		}, 1e2)
	},

	http: async function(method, path, body) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest()
		
			xhr.open("POST", `${APIServer}/api/${path}`)
			
			xhr.onload = () => {
				if (xhr.status == 200) {
					resolve(xhr.response)
				} else{
					reject(xhr.error)
				}
			}

			xhr.responseType = 'json'
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			xhr.withCredentials = true
			xhr.send(body)
		})
	}
}
