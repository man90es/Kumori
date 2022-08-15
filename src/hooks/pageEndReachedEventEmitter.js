export function usePageEndReachedEventEmitter() {
	window.onscroll = () => {
		const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

		if (bottomOfWindow) {
			window.emitter.emit("page-end-reached", {})
		}
	}
}
