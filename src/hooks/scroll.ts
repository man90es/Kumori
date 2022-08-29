import { computed } from "vue"
import { useSettingsStore } from "@/stores/settings"

export function useScroll() {
	const settings = useSettingsStore()
	const behaviour = computed(() => settings.animations ? "smooth" : "auto")

	return {
		scrollToTop: () => (
			window.scrollTo({ top: 0, behavior: behaviour.value })
		),
		scrollToBottom: () => (
			window.scrollTo({ top: document.body.scrollHeight, behavior: behaviour.value })
		),
	}
}
