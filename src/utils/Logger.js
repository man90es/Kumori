const DEBUG = 0
const ERROR = 1

export default class Logger {
	static #queue = []

	static debug(...messages) {
		Logger.#queue.push([DEBUG, messages])
		Logger.flush()
	}

	static error(...messages) {
		Logger.#queue.push([ERROR, messages])
		Logger.flush()
	}

	static flush() {
		while (Logger.#queue.length) {
			const message = Logger.#queue.shift()

			switch (message[0]) {
				case DEBUG:
					if (!window.vm?.$store.state.settings.debug) return
					// eslint-disable-next-line no-console
					return console.log(...message[1])

				case ERROR:
					// eslint-disable-next-line no-console
					return console.error(...message[1])
			}
		}
	}
}
