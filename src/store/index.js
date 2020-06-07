import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		feed: []
	},
	
	mutations: {
		updateBoardList(state, payload) {
			state.boards = payload.data
		},

		updateThreadList(state, payload) {
			state.threads = state.threads.filter((thread) => thread.boardName != payload.boardName).concat(payload.data)
		},
	}
})
