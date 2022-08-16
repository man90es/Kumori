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
		if (link.dataset.requested !== undefined) return
		if (link.dataset.boardName === undefined) link.dataset.boardName = route.params.boardName
		const postNumber = parseInt(link.dataset.number)

		if (undefined === findPost(postNumber)) {
			API.post.request({ boardName: link.dataset.boardName, postNumber })
		}

		link.dataset.requested = true
	})

	window.emitter.on("post-link-clicked", (link) => {
		router.push({
			name: "thread", params: {
				boardName: link.dataset.boardName,
				threadId: findPost(parseInt(link.dataset.number)).threadId
			}
		})
	})
}
