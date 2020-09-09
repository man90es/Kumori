import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'
import Feed from '../views/Feed.vue'
import SingleThread from '../views/SingleThread.vue'
import Bookmarks from '../views/Bookmarks.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/bookmarks', 
		name: 'bookmarks',
		component: Bookmarks
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
	},
	{
		path: '/:boardName/:threadId', 
		name: 'thread',
		component: SingleThread
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
