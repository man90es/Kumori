import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		animations: true,
		compactBoardMenu: false,
		debug: false,
		noko: true,
		repliesOnBoardPage: 3,
		theme: "Dark",
	}),
	persist: { key: "kumori-settings" },
})
