import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		posts: []
	},
	
	mutations: {
		updateBoardList(state, payload) {
			state.boards = payload
		},

		updateThreadList(state, payload) {
			state.threads = payload
		},

		updatePostList(state, payload) {
			state.posts = payload
		}
	},

	getters: {
		getThreadTail: (state) => (threadId, headId) => {
			return state.posts.filter((post) => post.threadId == threadId && post.id != headId)
		} 
	}
})
