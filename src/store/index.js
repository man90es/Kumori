import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {}
	},
	mutations: {
		updateBoardsList(state, payload) {
			state.boards = payload
		}
	},
	actions: {
		updateBoardsList(context) {
			API.getBoards().then((data) => context.commit('updateBoardsList', data))
		}
	},
	modules: {

	}
})
