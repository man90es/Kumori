import { defineStore } from "pinia"

type State = {
	bookmarked: Set<number>
	hidden: Set<number>
	selected: Set<number>
}

export const usePostMarksStore = defineStore("post-marks", {
	state: (): State => ({
		bookmarked: new Set(),
		hidden: new Set(),
		selected: new Set(),
	}),
	actions: {
		toggleHide(id: number) {
			this.hidden.has(id)
				? this.hidden.delete(id)
				: this.hidden.add(id)
		},
		toggleBookmark(id: number) {
			this.bookmarked.has(id)
				? this.bookmarked.delete(id)
				: this.bookmarked.add(id)
		},
		toggleSelect(id: number) {
			this.selected.has(id)
				? this.selected.delete(id)
				: this.selected.add(id)
		},
		clearSelected() {
			this.selected = new Set()
		},
	},
	getters: {
		postMarks: state => (id: number) => ({
			bookmarked: state.bookmarked.has(id),
			hidden: state.hidden.has(id),
			selected: state.selected.has(id),
		})
	},
	persist: {
		key: "kumori-post-marks",
		paths: ["bookmarked", "hidden"],
		serializer: {
			deserialize: json => JSON.parse(
				json,
				(_, value) => value instanceof Array ? new Set(value) : value
			),
			serialize: state => JSON.stringify(
				state,
				(_, value) => value instanceof Set ? [...value] : value
			)
		}
	},
})
