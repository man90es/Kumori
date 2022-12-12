import { createStore } from "vuex"
import { getProps } from "@/utils"
import API from "@/api"

const store = createStore({
	state: {
		boardList: [],
		boards: {},
		feedLists: {},
		postLists: {},
		posts: {},
		threadLists: {},
		threads: {},
	},
	mutations: {
		import(state, backup) {
			Object.assign(state, backup)
		},

		updateBoardList(state, payload) {
			state.boardList = payload
		},

		updateBoards(state, payload) {
			state.boards = { ...state.boards, ...payload }
		},

		updateThreadList(state, { boardName, payload, count, page }) {
			if (state.threadLists[boardName] === undefined) {
				state.threadLists[boardName] = []
			}

			for (let i = page * count; i < (page + 1) * count; i++) {
				const payloadI = i - page * count

				if (payload[payloadI]) {
					state.threadLists[boardName][i] = payload[payloadI]
				}
			}
		},

		updateThreads(state, payload) {
			for (let thread of payload) {
				state.threads[thread.id] = thread
			}
		},

		updatePostList(state, { threadId, payload, count, page }) {
			if (state.postLists[threadId] === undefined) {
				state.postLists[threadId] = []
			}

			if (page == 'tail') {
				let totalPosts = state.threads[threadId].posts

				for (let i = Math.max(totalPosts - count, 0), j = 0; i < totalPosts; i++, j++) {
					state.postLists[threadId][i] = payload[j]
				}
			} else {
				for (let i = page * count; i < (page + 1) * count; i++) {
					state.postLists[threadId][i] = payload[i]
				}
			}
		},

		updatePosts(state, payload) {
			for (let post of payload) {
				state.posts[post?.id] = post
			}
		},

		pushPost(state, post) {
			state.posts[post.id] = post

			if (state.postLists[post.threadId] === undefined) {
				return
			}

			state.threads[post.threadId].posts += 1
			state.postLists[post.threadId].push(post.id)
		},

		// TODO: Non-pinned threads should go below pinned ones
		pushThread(state, thread) {
			state.posts[thread.head.id] = thread.head
			state.postLists[thread.id] = [thread.head.id]
			state.threads[thread.id] = thread

			if (state.threadLists[thread.boardName] === undefined) {
				return
			}

			state.threadLists[thread.boardName].unshift(thread.id)
		},

		pushBoard(state, board) {
			state.threadLists[board.name] = []
			state.boards[board.name] = board
			state.boardList.push(board.name)
		},

		updateFeed(state, { boardName, payload, count, page }) {
			const newFeedList = state.feedLists[boardName] || []

			for (let i = 0; i < payload.length; ++i) {
				newFeedList[page * count + i] = payload[i]
			}

			state.feedLists[boardName] = newFeedList
		},
	},
})

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
			payload: data.map(thread => thread.id),
		})

		store.commit("updateThreads", data)

		for (let thread of data) {
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
				payload: data.map(post => post.id),
			})
		} else {
			// Thread
			store.commit("updatePostList", {
				...getProps(what, ["threadId", "count", "page"]),
				payload: data.map(post => post.id),
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
		const action = ({
			board: "pushBoard",
			post: "pushPost",
			thread: "pushThread",
		})[type]

		action && store.commit(action, data)
	},
)

export default store
