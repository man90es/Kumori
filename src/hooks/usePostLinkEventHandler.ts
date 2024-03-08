import { firstFromStringArrayOrString } from "@/utils"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import type { Post, StoreState } from "@/store"
import type FKClient from "@bakaso/fkclient"

export default function usePostLinkEventHandler(API: FKClient) {
	const route = useRoute()
	const router = useRouter()
	const store = useStore<StoreState>()

	function findPost(postNumber: Post["number"]) {
		return Object.values(store.state.posts).find(post => post.number === postNumber)
	}

	window.emitter.on("post-link-hovered", (link: HTMLAnchorElement) => {
		if (link.dataset.requested !== undefined) {
			return
		}

		const boardName = firstFromStringArrayOrString(link.dataset.boardName || route.params.boardName)
		const postNumber = Number(link.dataset.number)

		if (undefined === findPost(postNumber)) {
			// TODO: Display a floating post
			API.post.request({ boardName, postNumber })
		}

		link.dataset.requested = true.toString()
	})

	window.emitter.on("post-link-clicked", (link: HTMLAnchorElement) => {
		const boardName = firstFromStringArrayOrString(link.dataset.boardName || route.params.boardName)

		router.push({
			name: "thread", params: {
				boardName,
				threadId: findPost(parseInt(link.dataset.number ?? ""))?.threadId
			}
		})
	})
}
