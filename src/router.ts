import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import(/* webpackChunkName: "Home" */ "@/views/HomeView.vue")
		},
		{
			path: "/bookmarks",
			name: "bookmarks",
			component: () => import(/* webpackChunkName: "Extras" */ "@/views/BookmarksView.vue")
		},
		{
			path: "/:boardName",
			name: "board",
			component: () => import(/* webpackChunkName: "Main" */ "@/views/BoardView.vue")
		},
		{
			path: "/:boardName/feed",
			name: "feed",
			component: () => import(/* webpackChunkName: "Extras" */ "@/views/FeedView.vue")
		},
		{
			path: "/:boardName/:threadId",
			name: "thread",
			component: () => import(/* webpackChunkName: "Main" */ "@/views/SingleThreadView.vue")
		}
	]
})
