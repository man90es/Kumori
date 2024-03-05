import { getProps } from "@/utils"
import { useStore } from "vuex"
import { useToast } from "vue-toast-notification"
import type { Post, Thread } from "@/store"
import type FKClient from "@bakaso/fkclient"

export default function useAPIHandlers(API: FKClient) {
	const store = useStore()
	const toast = useToast()

	API.addInMessageListener(
		({ what, error }) => "boards" === what?.request && !error,
		({ data }) => {
			store.commit("updateBoardList", Object.keys(data))
			store.commit("updateBoards", data)
		}
	)

	API.addInMessageListener(
		({ what, error }) => "threads" === what?.request && !error,
		({ what, data }) => {
			if (undefined === data) {
				return
			}

			store.commit("updateThreadList", {
				...getProps(what, ["boardName", "count", "page"]),
				payload: data.map((thread: Thread) => thread.id),
			})

			store.commit("updateThreads", data)

			for (const thread of data) {
				store.commit("updatePostList", {
					threadId: thread.id,
					payload: [thread.head.id],
					count: 1,
					page: 0,
				})

				store.commit("updatePosts", [thread.head])
			}
		}
	)

	API.addInMessageListener(
		({ what, error }) => "thread" === what?.request && !error,
		({ data }) => {
			store.commit("updateThreads", [data])

			store.commit("updatePostList", {
				threadId: data.id,
				payload: [data.head.id],
				count: 1,
				page: 0,
			})

			store.commit("updatePosts", [data.head])
		}
	)

	API.addInMessageListener(
		({ what, error }) => "posts" === what?.request && !error,
		({ what, data }) => {
			if (what.boardName) {
				// Feed
				store.commit("updateFeed", {
					...getProps(what, ["boardName", "count", "page"]),
					payload: data.map((post: Post) => post.id),
				})
			} else {
				// Thread
				store.commit("updatePostList", {
					...getProps(what, ["threadId", "count", "page"]),
					payload: data.map((post: Post) => post.id),
				})
			}

			store.commit("updatePosts", data)
		}
	)

	API.addInMessageListener(
		({ what, error }) => "post" === what?.request && !error,
		({ data }) => {
			store.commit("updatePosts", [data])
		}
	)

	API.addInMessageListener(
		({ event, error }) => "created" === event && !error,
		({ type, data }) => {
			if (!type) {
				return
			}

			const action = ({
				board: "pushBoard",
				post: "pushPost",
				thread: "pushThread",
			})[type]

			action && store.commit(action, data)
		},
	)

	API.addInMessageListener(
		({ event }) => "deleted" === event,
		({ type, data }) => {
			if (!type) {
				return
			}

			const action = ({
				// TODO: Handle board deletion
				board: undefined,
				post: "unregisterPost",
				thread: "unregisterThread",
			})[type]

			action && store.commit(action, data)
		},
	)

	API.addInMessageListener(
		({ error }) => Boolean(error),
		({ error }) => {
			const text = error!.description || `Error ${error!.message} occured` || "Unexpected error occured"
			toast.error(text, { position: "top-right" })
		}
	)
}
