import { computed } from "vue"
import { useStore } from "vuex"

export function useScroll() {
	const store = useStore()
	const behavior = computed(() => (
		store.state.settings.animations ? "smooth" : "auto"
	))

	return {
		scrollToTop: () => (
			window.scrollTo({ top: 0, behavior: behavior.value })
		),
		scrollToBottom: () => (
			window.scrollTo({ top: document.body.scrollHeight, behavior: behavior.value })
		),
	}
}
