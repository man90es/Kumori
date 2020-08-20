const persistentMutations = [
	'setTrustedPostCount'
]

let data = {}

export const VuexLS = (store) => {
	// Parse localStorage string to object
	if (localStorage.vuex !== undefined) {
		data = JSON.parse(localStorage.vuex)
	}

	// Commit every saved mutation
	for (let mutation of persistentMutations) {
		if (data[mutation] !== undefined) {
			store.commit(mutation, data[mutation])
		}	
	}

	// Watch and save mutations
	store.subscribe((mutation, state) => {
		if (persistentMutations.includes(mutation.type)) {
			data[mutation.type] = mutation.payload
			localStorage.vuex = JSON.stringify(data)
		}
	})
}
