import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'
import Feed from '../views/Feed.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/:boardName', 
		name: 'board',
		component: Board
	},
	{
		path: '/:boardName/feed', 
		name: 'feed',
		component: Feed
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
