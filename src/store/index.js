import Vuex from 'vuex'
import { VuexLS } from './VuexLS'
import API from '../api'

function toggleListEntry(state, listName, entry) {
	let i = state[listName].indexOf(entry)

	if (i >= 0) {
		state[listName].splice(i, 1)
	} else {
		state[listName].push(entry)
	}
}

function clearList(state, listName) {
	state[listName] = []
}

const store = Vuex.createStore({
	state: {
		boardList: [],
		boards: {},
		threadLists: {},
		threads: {},
		postLists: {},
		posts: {},
		feedLists: {},
		hiddenPostsList: [],
		selectedPostsList: [],
		bookmarkedPostsList: [],
		trustedPostCount: 0,
		theme: 0,
		repliesOnBoardPage: 3,
		debug: false,
		compactBoardMenu: false,
		locale: process.env.VUE_APP_LOCALE || "en",
	},

	plugins: [ VuexLS ],

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

		updateThreadList(state, {boardName, payload, count, page}) {
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

		updatePostList(state, {threadId, payload, count, page}) {
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

		updateFeed(state, {boardName, payload, count, page}) {
			if (state.feedLists[boardName] === undefined) {
				state.feedLists[boardName] = []
			}

			for (let i = 0; i < count; i++) {
				state.feedLists[boardName][page * count + i] = payload[i]
			}
		},

		toggleHidden(state, postId) {
			toggleListEntry(state, 'hiddenPostsList', postId)
		},

		toggleBookmarked(state, postId) {
			toggleListEntry(state, 'bookmarkedPostsList', postId)
		},

		toggleSelected(state, postId) {
			toggleListEntry(state, 'selectedPostsList', postId)
		},

		clearSelected(state) {
			clearList(state, 'selectedPostsList')
		},

		setTrustedPostCount(state, payload) {
			state.trustedPostCount = payload
		},

		toggleTheme(state) {
			state.theme = (state.theme + 1) % 2
		},

		setRepliesOnBoardPage(state, payload) {
			state.repliesOnBoardPage = payload
		},

		toggleDebug(state) {
			state.debug = !state.debug
		},

		toggleCompactBoardMenu(state) {
			state.compactBoardMenu = !state.compactBoardMenu
		},

		setLocale(state, locale) {
			state.locale = locale
		},
	},
})

API.addListener(
	message => 'boards' === message.what?.request,
	(message) => {
		store.commit('updateBoardList', Object.keys(message.data))
		store.commit('updateBoards', message.data)
	}
)

API.addListener(
	message => 'threads' === message.what?.request,
	(message) => {
		store.commit('updateThreadList', {
			boardName: message.what?.boardName,
			payload: message.data.map(thread => thread.id),
			count: message.what?.count,
			page: message.what?.page
		})

		store.commit('updateThreads', message.data)

		for (let thread of message.data) {
			store.commit('updatePostList', {
				threadId: thread.id,
				payload: [thread.head.id],
				count: 1,
				page: 0
			})

			store.commit('updatePosts', [thread.head])
		}
	}
)

API.addListener(
	message => 'thread' === message.what?.request,
	(message) => {
		store.commit('updateThreads', [message.data])

		store.commit('updatePostList', {
			threadId: message.data.id,
			payload: [message.data.head.id],
			count: 1,
			page: 0
		})

		store.commit('updatePosts', [message.data.head])
	}
)

API.addListener(
	message => 'posts' === message.what?.request,
	(message) => {
		if (message.what?.boardName) {
			// Feed
			store.commit('updateFeed', {
				boardName: message.what?.boardName,
				payload: message.data.map(post => post.id),
				count: message.what?.count,
				page: message.what?.page
			})
		} else {
			// Thread
			store.commit('updatePostList', {
				threadId: message.what?.threadId,
				payload: message.data.map(post => post.id),
				count: message.what?.count,
				page: message.what?.page
			})
		}

		store.commit('updatePosts', message.data)
	}
)

API.addListener(
	message => 'post' === message.what?.request,
	(message) => {
		store.commit('updatePosts', [message.data])
	}
)

export default store
