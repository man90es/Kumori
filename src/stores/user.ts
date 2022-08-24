import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
	state: () => ({
		email: null,
		expiredAt: null,
		id: null,
		name: null,
		registeredAt: null,
	}),
	persist: { key: "kumori-user" },
})
