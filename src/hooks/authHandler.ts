import { useUserStore } from "@/stores/user"
import api from "@/api"

let initialised = false

export function useAuthHandler(): void {
	const store = useUserStore()

	if (initialised) {
		return
	}

	initialised = true

	api.addInMessageListener(
		({ what }) => /logon|register/i.test(what?.request || ""),
		({ data }) => {
			store.$patch(data)
			window.emitter.emit("log-on")
		}
	)

	api.addInMessageListener(
		({ what }) => /logoff/i.test(what?.request || ""),
		({ data }) => {
			if (data.success) {
				store.$reset()
				window.emitter.emit("log-off")
			}
		}
	)
}
