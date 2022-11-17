import { useToast } from "vue-toast-notification"
import API from "@/api"

export function useDisplayErrorToasts() {
	const toast = useToast()

	API.addInMessageListener(
		({ error }) => Boolean(error),
		({ error }) => {
			const text = error!.description || `Error ${error!.message} occured` || "Unexpected error occured"
			toast.error(text, { position: "top-right" })
		}
	)
}
