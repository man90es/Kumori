import { ref } from "vue"

export function useViewMode() {
	const portrait = ref(false)
	const landscape = ref(true)

	function calculateViewMode() {
		portrait.value = window.innerWidth < window.innerHeight
		landscape.value = !portrait.value
	}

	calculateViewMode()
	window.addEventListener("resize", calculateViewMode)

	return { portrait, landscape }
}
