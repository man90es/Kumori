const persistentMutations = {
	setTrustedPostCount: 'trustedPostCount',
	toggleHidePost: 'hiddenPosts',
	toggleBookmarkPost: 'bookmarkedPostIds',
	toggleTheme: 'theme',
	setRepliesOnBoardPage: 'repliesOnBoardPage'
}

let data = {}

export const VuexLS = (store) => {
	// Parse localStorage string to object
	if (localStorage.vuex !== undefined) {
		data = JSON.parse(localStorage.vuex)
	}

	// Commit saved data
	store.commit('import', data)

	// Watch and save mutations
	store.subscribe((mutation, state) => {
		if (mutation.type in persistentMutations) {
			data[persistentMutations[mutation.type]] = state[persistentMutations[mutation.type]]
			localStorage.vuex = JSON.stringify(data)
		}
	})
}
