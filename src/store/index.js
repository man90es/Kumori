import Vuex from 'vuex'
import { VuexLS } from './VuexLS'
import { request } from '../api/request'
import { Logger } from '../utils'

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
		APIServer: 'http://127.0.0.1:6749',
		siteTitle: 'Kumori'
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
		}
	},

	actions: { // Requests to API
		// eslint-disable-next-line no-unused-vars
		requestBoardList(context) {
			Logger.debug('Requesting boards')
			request.ws({request: 'boards'})
		},

		// eslint-disable-next-line no-unused-vars
		requestThreadList(context, {boardName, count, page}) {
			Logger.debug('Requesting threads for board: ', boardName)
			request.ws({request: 'threads', boardName, count, page})
		},

		// eslint-disable-next-line no-unused-vars
		requestThread(context, {id}) {
			Logger.debug('Requesting thread: ', id)
			request.ws({request: 'thread', id})
		},

		// eslint-disable-next-line no-unused-vars
		requestPostList(context, {threadId, count, page}) {
			Logger.debug('Requesting posts for thread: ', threadId)
			request.ws({request: 'posts', threadId, count, page})
		},

		// eslint-disable-next-line no-unused-vars
		requestPost(context, {id}) {
			Logger.debug('Requesting post: ', id)
			request.ws({request: 'post', id})
		},

		// eslint-disable-next-line no-unused-vars
		requestFeed(context, {boardName, count, page}) {
			if (page == 0 || context.state.feedLists[boardName][context.state.feedLists[boardName].length - 1] != undefined) {
				Logger.debug('Requesting feed for board: ', boardName)
				request.ws({request: 'posts', boardName, count, page})
			} else {
				Logger.debug('Last feed page reached, no need to request')
			}
		},

		// eslint-disable-next-line no-unused-vars
		submitSearchQuery(context, {query, parameters}) {
			Logger.debug('Submitting search query: ', query)
			request.ws({request: 'search', query, parameters})
		}
	}
})

request.init(store.state.APIServer, (message) => { // API response handlers
	if (undefined !== message.error) {
		Logger.error('Websocket error occured:', message)
	}

	switch (message.what.request) {
		case 'boards':
			store.commit('updateBoardList', Object.keys(message.data))
			store.commit('updateBoards', message.data)
			break

		case 'threads':
			store.commit('updateThreadList', {
				boardName: message.what.boardName,
				payload: message.data.map(thread => thread.id),
				count: message.what.count,
				page: message.what.page
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

			break

		case 'thread':
			store.commit('updateThreads', [message.data])

			store.commit('updatePostList', {
				threadId: message.data.id,
				payload: [message.data.head.id],
				count: 1,
				page: 0
			})

			store.commit('updatePosts', [message.data.head])

			break

		case 'posts':
			if (message.what.boardName) {
				// Feed
				store.commit('updateFeed', {
					boardName: message.what.boardName,
					payload: message.data.map(post => post.id),
					count: message.what.count,
					page: message.what.page
				})
			} else {
				// Thread
				store.commit('updatePostList', {
					threadId: message.what.threadId,
					payload: message.data.map(post => post.id),
					count: message.what.count,
					page: message.what.page
				})
			}

			store.commit('updatePosts', message.data)

			break

		case 'post':
			store.commit('updatePosts', [message.data])
			break

		default:
			Logger.error('Unhandled websocket message:', message)
	}
})

export default store
