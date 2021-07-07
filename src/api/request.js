import { log, wait } from '../utils'

export let meta = {}

export const request = {
	wsGate: null,
	ready: false,
	APIServer: '',

	init: function(APIServer, messageHandler) {
		this.APIServer = APIServer
		this.http('GET', 'meta', null, 1e3).then(response => {
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

	http: async function(method, path, body, delay) {
		let options = {
			method: method,
			mode: 'cors',
			credentials: 'include',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}

		if (!['HEAD', 'GET'].includes(method)) {
			options.body = body
		}

		return fetch(`${this.APIServer}/api/${path}`, options)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw `${response.status}: ${response.statusText}`
			}
		})
		.catch((error) => {
			if (delay) {
				log(`${path} fetch request failed with status code ${error}, retrying in ${delay / 1e3} seconds`)
				return wait(delay).then(() => this.http(method, path, body, delay * 2))
			} else {
				throw error
			}
		})
	}
}
