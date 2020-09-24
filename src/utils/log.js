let queue = []

export default function log(...data) {
	queue.push(data)

	if (window.vm && window.vm.$store.state.debug) {
		while (queue.length) {
			// eslint-disable-next-line no-console
			console.log(...queue.shift())
		}
	}
}