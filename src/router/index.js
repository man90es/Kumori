import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/:board', 
		name: 'board',
		component: Board
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
