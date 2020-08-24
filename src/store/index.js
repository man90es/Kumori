import Vue from 'vue'
import Vuex from 'vuex'
import { VuexLS } from './VuexLS'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		posts: {},
		feed: [],
		trustedPostCount: 0
	},

	plugins: [ VuexLS ],
	
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
		},

		setTrustedPostCount(state, payload) {
			state.trustedPostCount = payload
		},

		import(state, payload) {
			for (const [key, value] of Object.entries(payload)) {
				state[key] = value
			}
		}
	},

	getters: {
		getCurrentThread: (state) => {
			return state.threads.find((thread) => thread.id == window.vm.$route.params.threadId)
		},

		getThread: (state) => (threadId) => {
			return state.threads.find((thread) => thread.id == threadId)
		}
	},

	created() {
		// pass
	}
})
