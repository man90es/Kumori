import { defineStore } from "pinia"

type State = {
	email: string | null
	expiredAt: string | null
	id: string | null
	name: string | null
	registeredAt: string | null
}

export const useUserStore = defineStore("user", {
	state: (): State => ({
		email: null,
		expiredAt: null,
		id: null,
		name: null,
		registeredAt: null,
	}),
	persist: { key: "kumori-user" },
})
