import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import API from "@/api"

export function usePostLinkEventHandler() {
	const store = useStore()
	const route = useRoute()
	const router = useRouter()

	function findPost(postNumber) {
		return Object.values(store.state.posts).find(post => post.number === postNumber)
	}

	window.emitter.on("post-link-hovered", (link) => {
		if (link.dataset.requested !== undefined) {
			return
		}

		const boardName = link.dataset.boardName || route.params.boardName
		const postNumber = Number(link.dataset.number)

		if (undefined === findPost(postNumber)) {
			// TODO: Display a floating post
			API.post.request({ boardName, postNumber })
		}

		link.dataset.requested = true
	})

	window.emitter.on("post-link-clicked", (link) => {
		const boardName = link.dataset.boardName || route.params.boardName

		router.push({
			name: "thread", params: {
				boardName,
				threadId: findPost(parseInt(link.dataset.number)).threadId
			}
		})
	})
}
