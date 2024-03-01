import { useUserStore } from "@/stores/user"
import type FKClient from "@bakaso/fkclient"

let initialised = false

export function useAuthHandler(API: FKClient): void {
	const store = useUserStore()

	if (initialised) {
		return
	}

	initialised = true

	API.addInMessageListener(
		({ what }) => /logon|register/i.test(what?.request || ""),
		({ data }) => {
			store.$patch(data)
			window.emitter.emit("log-on")
		}
	)

	API.addInMessageListener(
		({ what }) => /logoff/i.test(what?.request || ""),
		({ data }) => {
			if (data.success) {
				store.$reset()
				window.emitter.emit("log-off")
			}
		}
	)
}
