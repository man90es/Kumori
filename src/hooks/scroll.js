export function useScroll() {
	return {
		scrollToTop: () => {
			return scrollTo({ top: 0, behavior: "smooth" })
		},

		scrollToBottom: () => {
			return scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
		},
	}
}
