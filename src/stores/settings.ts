import { defineStore } from "pinia"

type State = {
	animations: boolean
	apiURI: string
	compactBoardMenu: boolean
	debug: boolean
	noko: boolean
	repliesOnBoardPage: number
	theme: "Dark" | "Light"
}

export const useSettingsStore = defineStore("settings", {
	state: (): State => ({
		animations: true,
		apiURI: process.env.VUE_APP_API_ENDPOINT?.split(",")[0] ?? "",
		compactBoardMenu: false,
		debug: false,
		noko: true,
		repliesOnBoardPage: 3,
		theme: "Dark",
	}),
	persist: { key: "kumori-settings" },
})
