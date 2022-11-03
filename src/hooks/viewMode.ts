import { computed, readonly, ref } from "vue"

export function useViewMode() {
	const portrait = ref(false)
	const landscape = computed(() => !portrait.value)

	function calculateViewMode() {
		portrait.value = window.innerWidth < window.innerHeight
	}

	calculateViewMode()
	window.addEventListener("resize", calculateViewMode)

	return {
		landscape,
		portrait: readonly(portrait),
	}
}
