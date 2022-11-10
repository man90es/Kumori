import { createStore } from "vuex"
import { getProps } from "@/utils"
import API from "@/api"
import Memento from "memento-vuex"

const store = createStore({
	state: {
		boardList: [],
		boards: {},
		feedLists: {},
		postLists: {},
		posts: {},
		threadLists: {},
		threads: {},
		trustedPostCount: 0,
	},

	plugins: [
		Memento({
			setTrustedPostCount: "trustedPostCount",
		}, "kumori-vuex")
	],

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
				if (payload[i]) {
					state.threadLists[boardName][i] = payload[i]
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

		setTrustedPostCount(state, payload) {
			state.trustedPostCount = payload
		},
	},
})

API.addListener(
	message => "boards" === message.what?.request,
	(message) => {
		store.commit("updateBoardList", Object.keys(message.data))
		store.commit("updateBoards", message.data)
	}
)

API.addListener(
	message => "threads" === message.what?.request,
	(message) => {
		store.commit("updateThreadList", {
			...getProps(message.what, ["boardName", "count", "page"]),
			payload: message.data.map(thread => thread.id),
		})

		store.commit("updateThreads", message.data)

		for (let thread of message.data) {
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

API.addListener(
	message => "thread" === message.what?.request,
	(message) => {
		store.commit("updateThreads", [message.data])

		store.commit("updatePostList", {
			threadId: message.data.id,
			payload: [message.data.head.id],
			count: 1,
			page: 0,
		})

		store.commit('updatePosts', [message.data.head])
	}
)

API.addListener(
	message => "posts" === message.what?.request,
	(message) => {
		if (message.what?.boardName) {
			// Feed
			store.commit("updateFeed", {
				...getProps(message.what, ["boardName", "count", "page"]),
				payload: message.data.map(post => post.id),
			})
		} else {
			// Thread
			store.commit("updatePostList", {
				...getProps(message.what, ["threadId", "count", "page"]),
				payload: message.data.map(post => post.id),
			})
		}

		store.commit("updatePosts", message.data)
	}
)

API.addListener(
	message => "post" === message.what?.request,
	(message) => {
		store.commit("updatePosts", [message.data])
	}
)

API.addListener(
	({ event }) => "created" === event,
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
