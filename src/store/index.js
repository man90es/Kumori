import { createStore } from "vuex"

export default createStore({
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

		unregisterPost(state, post) {
			const postList = state.postLists[post.threadId]

			if (undefined === postList) {
				return
			}

			state.postLists[post.threadId] = postList.filter(id => post.id !== id)
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

		unregisterThread(state, thread) {
			const threadList = state.threadLists[thread.boardName]

			if (undefined === threadList) {
				return
			}

			state.threadLists[thread.boardName] = threadList.filter(id => thread.id !== id)
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
