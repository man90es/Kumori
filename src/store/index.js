import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		posts: {},
		currentBoardName: '',
		currentThreadId: 0,
	},
	
	mutations: {
		updateBoardList(state, payload) {
			state.boards = payload
		},

		updateThreadList(state, payload) {
			state.threads = payload
		},

		updatePostList(state, payload) {
			Vue.set(state.posts, payload.what.threadId, payload.data)
		},

		updateCurrentBoard(state, payload) {
			state.currentBoardName = payload
		},

		updateCurrentThread(state, payload) {
			state.currentThreadId = payload
		}
	},

	getters: {
		getCurrentThread: (state) => {
			return state.threads.find((thread) => thread.id == state.currentThreadId)
		},

		getThread: (state) => (threadId) => {
			return state.threads.find((thread) => thread.id == threadId)
		}
	}
})
