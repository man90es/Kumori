import { computed } from "vue"
import { useStore } from "vuex"

export function useTheme() {
	const store = useStore()
	const themes = new Map()

	themes.set(0, { // Default dark
		"--text-color": "#bbc",
		"--text-secondary-color": "#99a",
		"--text-green-color": "#98c379",
		"--card-color": "#292d35",
		"--card-secondary-color": "#252931",
		"--background-color": "#21252b",
		"--link-over-color": "#40c0f3",
		"--link-hover-color": "#108fbf",
		"--gap-size": "0.5rem",
		"--icon-invert": "70%",
	})

	themes.set(1, { // Light
		"--text-color": "#37474f",
		"--text-secondary-color": "#666",
		"--text-green-color": "#789922",
		"--card-color": "#ededed",
		"--card-secondary-color": "#ededed",
		"--background-color": "#e6e6e6",
		"--link-over-color": "#d7535c",
		"--link-hover-color": "#096be8",
		"--gap-size": "0.5rem",
		"--icon-invert": "40%",
	})

	return computed(() => themes.get(store.state.settings.theme))
}
