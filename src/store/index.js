import Vue from 'vue'
import Vuex from 'vuex'
import { VuexLS } from './VuexLS'
import { request } from '../api/request'
import { APIServer, debug } from '../../config'

Vue.use(Vuex)

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

const store = new Vuex.Store({
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
		repliesOnBoardPage: 3
	},

	plugins: [ VuexLS ],
	
	mutations: {
		import(state, payload) {
			for (const [key, value] of Object.entries(payload)) {
				state[key] = value
			}
		},

		updateBoardList(state, payload) {
			state.boardList = payload
		},

		updateBoards(state, payload) {
			for (let key in payload) {
				Vue.set(state.boards, key, payload[key])
			}
		},

		updateThreadList(state, {boardName, payload, count, page}) {
			if (state.threadLists[boardName] == undefined) {
				Vue.set(state.threadLists, boardName, [])
			}

			for (let i = page * count; i < (page + 1) * count; i++) {
				if (payload[i]) {
					Vue.set(state.threadLists[boardName], i, payload[i])
				}
			}
		},

		updateThreads(state, payload) {
			for (let thread of payload) {
				Vue.set(state.threads, thread.id, thread)
			}
		},
		
		updatePostList(state, {threadId, payload, count, page}) {
			if (state.postLists[threadId] == undefined) {
				Vue.set(state.postLists, threadId, [])
			}

			if (page == 'tail') {
				let totalPosts = state.threads[threadId].posts

				for (let i = Math.max(totalPosts - count, 0), j = 0; i < totalPosts; i++, j++) {
					Vue.set(state.postLists[threadId], i, payload[j])
				}
			} else {
				for (let i = page * count; i < (page + 1) * count; i++) {
					Vue.set(state.postLists[threadId], i, payload[i])
				}
			}
		},

		updatePosts(state, payload) {
			for (let post of payload) {
				Vue.set(state.posts, post.id, post)
			}
		},

		updateFeed(state, {boardName, payload, count, page}) {
			if (state.feedLists[boardName] == undefined) {
				Vue.set(state.feedLists, boardName, [])
			}
			
			for (let i = page * count; i < (page + 1) * count; i++) {
				Vue.set(state.feedLists[boardName], i, payload[i])
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

		toggleTheme(state, payload) {
			state.theme = (state.theme + 1) % 2
		},

		setRepliesOnBoardPage(state, payload) {
			state.repliesOnBoardPage = payload
		}
	},

	actions: { // Requests to API
		requestBoardList(context) {
			if (debug) {
				console.log('Requesting boards')
			}

			request.ws({request: 'boards'})
		},

		requestThreadList(context, {boardName, count, page}) {
			if (debug) {
				console.log('Requesting threads for board: ', boardName)
			}

			request.ws({request: 'threads', boardName, count, page})
		},

		requestThread(context, {id}) {
			if (debug) {
				console.log('Requesting thread: ', id)
			}

			request.ws({request: 'thread', id})
		},

		requestPostList(context, {threadId, count, page}) {
			if (debug) {
				console.log('Requesting posts for thread: ', threadId)
			}

			request.ws({request: 'posts', threadId, count, page})
		},

		requestPost(context, {id}) {
			if (debug) {
				console.log('Requesting post: ', id)
			}

			request.ws({request: 'post', id})
		},

		requestFeed(context, {boardName, count, page}) {
			if (debug) {
				console.log('Requesting feed for board: ', boardName)
			}

			request.ws({request: 'posts', boardName, count, page})
		},

		submitSearchQuery(context, {query, parameters}) {
			request.ws({request: 'search', query, parameters})
		}
	}
})

request.init(APIServer, (message) => { // API response handlers
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
			if (debug) {
				console.log('Unhandled websocket message:', message)
			}
	}
})

export default store