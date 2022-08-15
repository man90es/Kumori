import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import(/* webpackChunkName: "Home" */ "@/views/HomeView")
		},
		{
			path: "/bookmarks",
			name: "bookmarks",
			component: () => import(/* webpackChunkName: "Extras" */ "@/views/BookmarksView")
		},
		{
			path: "/:boardName",
			name: "board",
			component: () => import(/* webpackChunkName: "Main" */ "@/views/BoardView")
		},
		{
			path: "/:boardName/feed",
			name: "feed",
			component: () => import(/* webpackChunkName: "Extras" */ "@/views/FeedView")
		},
		{
			path: "/:boardName/:threadId",
			name: "thread",
			component: () => import(/* webpackChunkName: "Main" */ "@/views/SingleThreadView")
		}
	]
})
