import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		posts: {},
		feed: []
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

		updateFeed(state, payload) {
			state.feed = payload.data
		}
	},

	getters: {
		getCurrentThread: (state) => {
			return state.threads.find((thread) => thread.id == window.vm.$route.params.threadId)
		},

		getThread: (state) => (threadId) => {
			return state.threads.find((thread) => thread.id == threadId)
		}
	}
})
