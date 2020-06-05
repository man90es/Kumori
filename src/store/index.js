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
		updateBoardsList(state, payload) {
			state.boards = payload
		},
	}
})
