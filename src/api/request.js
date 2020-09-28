import store from '../store' 

export let meta = {}

export const request = {
	wsGate: null,
	ready: false,
	APIServer: '',

	init: function(APIServer, messageHandler) {
		this.APIServer = APIServer
		this.http('GET', 'meta', null).then(response => {
			meta = response
			this.wsGate = new WebSocket(meta.ws)

			this.wsGate.onopen = () => this.ready = true
			this.wsGate.onclose = () => this.ready = false
			window.onbeforeunload = () => this.wsGate.close()

			this.wsGate.addEventListener('message', (message) => {
				messageHandler(JSON.parse(message.data))
			})
		})
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
		
			xhr.open(method, `${this.APIServer}/api/${path}`)
			
			xhr.onload = () => {
				if (xhr.status == 200) {
					resolve(xhr.response)
				} else{
					reject(xhr.error)
				}
			}

			xhr.responseType = 'json'
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
			xhr.withCredentials = true
			xhr.send(body)
		})
	}
}
