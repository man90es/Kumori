import { createStore } from "vuex"

type Board = {
	name: string
}

export type Thread = {
	id: number
	boardName: Board["name"]
	head: Post
	posts: number
}

export type Post = {
	id: number
	number: number
	threadId: Thread["id"]
	replies: Array<{
		boardName: Board["name"]
		number: Post["number"]
		threadId: Thread["id"]
	}>
}

export type StoreState = {
	boardList: Array<Board["name"]>
	boards: Record<Board["name"], Board>
	feedLists: Record<Board["name"], unknown[]>
	postLists: Record<Thread["id"], Array<Post["id"]>>
	posts: Record<Post["id"], Post>
	threadLists: Record<Board["name"], Array<Thread["id"]>>
	threads: Record<Thread["id"], Thread>
}

export default createStore<StoreState>({
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
		updateBoardList(state, payload: Array<Board["name"]>) {
			state.boardList = payload
		},

		updateBoards(state, payload: Record<Board["name"], Board>) {
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

		updateThreads(state, payload: Thread[]) {
			for (const thread of payload) {
				state.threads[thread.id] = thread
			}
		},

		updatePostList(state, { threadId, payload, count, page }) {
			if (state.postLists[threadId] === undefined) {
				state.postLists[threadId] = []
			}

			if (page == 'tail') {
				const totalPosts = state.threads[threadId].posts

				for (let i = Math.max(totalPosts - count, 0), j = 0; i < totalPosts; i++, j++) {
					state.postLists[threadId][i] = payload[j]
				}
			} else {
				for (let i = page * count; i < (page + 1) * count; i++) {
					state.postLists[threadId][i] = payload[i]
				}
			}
		},

		updatePosts(state, payload: Post[]) {
			for (const post of payload) {
				state.posts[post?.id] = post
			}
		},

		pushPost(state, post: Post) {
			state.posts[post.id] = post

			if (state.postLists[post.threadId] === undefined) {
				return
			}

			state.threads[post.threadId].posts += 1
			state.postLists[post.threadId].push(post.id)
		},

		unregisterPost(state, post: Post) {
			const postList = state.postLists[post.threadId]

			if (undefined === postList) {
				return
			}

			state.postLists[post.threadId] = postList.filter(id => post.id !== id)
		},

		// TODO: Non-pinned threads should go below pinned ones
		pushThread(state, thread: Thread) {
			state.posts[thread.head.id] = thread.head
			state.postLists[thread.id] = [thread.head.id]
			state.threads[thread.id] = thread

			if (state.threadLists[thread.boardName] === undefined) {
				return
			}

			state.threadLists[thread.boardName].unshift(thread.id)
		},

		unregisterThread(state, thread: Thread) {
			const threadList = state.threadLists[thread.boardName]

			if (undefined === threadList) {
				return
			}

			state.threadLists[thread.boardName] = threadList.filter(id => thread.id !== id)
		},

		pushBoard(state, board: Board) {
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

		clear(state) {
			state.boardList = []
			state.boards = {}
			state.feedLists = {}
			state.postLists = {}
			state.posts = {}
			state.threadLists = {}
			state.threads = {}
		}
	},
})
