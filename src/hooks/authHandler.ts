import { useUserStore } from "@/stores/user"
import api from "@/api"

let initialised = false

export function useAuthHandler(): void {
	const store = useUserStore()

	if (initialised) {
		return
	}

	initialised = true

	api.addListener(
		(msg) => "what" in msg && /logon|register/i.test(msg.what.request!),
		(msg) => {
			store.$patch(msg.data)
			window.emitter.emit("log-on")
		}
	)

	api.addListener(
		(msg) => "what" in msg && /logoff/i.test(msg.what.request!),
		(msg) => {
			if (msg.data.success) {
				store.$reset()
				window.emitter.emit("log-off")
			}
		}
	)
}
