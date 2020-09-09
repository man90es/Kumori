import Vue from 'vue'
import Vuex from 'vuex'
import { VuexLS } from './VuexLS'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		boards: {},
		threads: [],
		posts: {},
		feed: [],
		trustedPostCount: 0,
		hiddenPosts: [],
		selectedForDeletionPosts: [],
		theme: 0,
		repliesOnBoardPage: 3,
		bookmarkedPostIds: [],
		individualPosts: []
	},

	plugins: [ VuexLS ],
	
	mutations: {
		updateBoardList(state, payload) {
			state.boards = payload
		},

		updateThreadList(state, payload) {
			state.threads = payload
		},

		updatePostList(state, payload) {
			Vue.set(state.posts, payload.what.threadId, payload.data)
		},

		updateFeed(state, payload) {
			state.feed = payload.data
		},

		setTrustedPostCount(state, payload) {
			state.trustedPostCount = payload
		},

		toggleHidePost(state, payload) {
			let i = state.hiddenPosts.indexOf(payload)

			if (i >= 0) {
				state.hiddenPosts.splice(i, 1)
			} else {
				state.hiddenPosts.push(payload)
			}
		},

		toggleBookmarkPost(state, payload) {
			let i = state.bookmarkedPostIds.indexOf(payload)

			if (i >= 0) {
				state.bookmarkedPostIds.splice(i, 1)
			} else {
				state.bookmarkedPostIds.push(payload)
			}
		},

		toggleSelectedForDeletionPost(state, payload) {
			let i = state.selectedForDeletionPosts.indexOf(payload)

			if (i >= 0) {
				state.selectedForDeletionPosts.splice(i, 1)
			} else {
				state.selectedForDeletionPosts.push(payload)
			}
		},

		clearSelectedForDeletionPosts(state, payload) {
			state.selectedForDeletionPosts = []
		},

		toggleTheme(state, payload) {
			state.theme = (state.theme + 1) % 2
		},

		import(state, payload) {
			for (const [key, value] of Object.entries(payload)) {
				state[key] = value
			}
		},

		setRepliesOnBoardPage(state, payload) {
			state.repliesOnBoardPage = payload
		},

		updateIndividualPostList(state, payload) {
			let i = state.individualPosts.map(post => post.id).indexOf(payload.data.id)

			if (i >= 0) {
				state.individualPosts.splice(i, 1)
			}

			state.individualPosts.push(payload.data)
		}
	},

	getters: {
		getCurrentThread: (state) => {
			return state.threads.find((thread) => thread.id == window.vm.$route.params.threadId)
		},

		getThread: (state) => (threadId) => {
			return state.threads.find((thread) => thread.id == threadId)
		},

		getThreadReplies: (state) => (threadId) => {
			if (state.posts[threadId]) {
				let headId = state.threads.find((thread) => thread.id == threadId).head.id
				return state.posts[threadId].filter((post) => post.id != headId)
			} else {
				return []
			}
		},

		isHidden: (state) => (postId) => {
			return state.hiddenPosts.includes(postId)
		},

		isBookmarked: (state) => (postId) => {
			return state.bookmarkedPostIds.includes(postId)
		},

		isSelectedForDeletion: (state) => (postId) => {
			return state.selectedForDeletionPosts.includes(postId)
		},

		getBookmarkedPosts: (state) => {
			return (state.individualPosts || []).filter((post) => state.bookmarkedPostIds.includes(post.id))
		}
	},

	created() {
		// pass
	}
})
