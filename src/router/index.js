import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Board = () => import(/* webpackChunkName: "Main" */ '../views/Board.vue')
const Feed = () => import(/* webpackChunkName: "Extras" */ '../views/Feed.vue')
const SingleThread = () => import(/* webpackChunkName: "Main" */ '../views/SingleThread.vue')
const Bookmarks = () => import(/* webpackChunkName: "Extras" */ '../views/Bookmarks.vue')

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
