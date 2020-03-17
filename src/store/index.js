import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: {}
	},
	mutations: {
		updateBoardsList(state, payload) {
			state.boards = payload
		},

		updateThreadsList(state, payload) {
			state.threads = payload
		}
	},
	actions: {
		updateBoardsList(context) {
			API.getBoards().then((data) => context.commit('updateBoardsList', data))
		},

		updateThreadsList(context, payload) {
			API.getThreads(payload.boardName, payload.count, payload.page).then((data) => context.commit('updateThreadsList', data))
		}
	},
	modules: {

	}
})
