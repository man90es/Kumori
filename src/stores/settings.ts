import { defineStore } from "pinia"

type State = {
	animations: boolean
	compactBoardMenu: boolean
	debug: boolean
	noko: boolean
	repliesOnBoardPage: number
	theme: "Dark" | "Light"
}

export const useSettingsStore = defineStore("settings", {
	state: (): State => ({
		animations: true,
		compactBoardMenu: false,
		debug: false,
		noko: true,
		repliesOnBoardPage: 3,
		theme: "Dark",
	}),
	persist: { key: "kumori-settings" },
})
