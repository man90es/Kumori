<template>
	<div class="postMenu" @click="emit('cancel')">
		<div @click="hidePost">{{ isPostHidden ? "Show" : "Hide" }}</div>
		<div @click="bookmarkPost">{{ isPostBookmarked ? "Remove from bookmarks" : "Bookmark" }}</div>
		<div @click="deletePost">{{ isPostSelected ? "Do not delete" : "Delete" }}</div>
		<div>Cancel</div>
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"

	const emit = defineEmits(["cancel"])
	const props = defineProps({ postId: Number })
	const store = useStore()

	function hidePost() {
		store.commit("toggleHidden", props.postId)
	}

	function bookmarkPost() {
		store.commit("toggleBookmarked", props.postId)
	}

	function deletePost() {
		store.commit("toggleSelected", props.postId)
		window.emitter.emit("post-delete-button-click")
	}

	const isPostHidden = computed(() => store.state.hiddenPostsList.includes(props.postId))
	const isPostBookmarked = computed(() => store.state.bookmarkedPostsList.includes(props.postId))
	const isPostSelected = computed(() => store.state.selectedPostsList.includes(props.postId))
</script>

<style scoped lang="scss">
	.postMenu {
		position: absolute;
		background-color: var(--card-color);
		z-index: 99;

		div {
			cursor: pointer;
			padding: var(--gap-size);

			&:hover {
				background-color: var(--card-secondary-color);
			}
		}
	}
</style>
