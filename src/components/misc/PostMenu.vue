<template>
	<div class="postMenu" @click="emit('cancel')">
		<div @click="hidePost">{{ marks.hidden ? "Show" : "Hide" }}</div>
		<div @click="bookmarkPost">{{ marks.bookmarked ? "Remove from bookmarks" : "Bookmark" }}</div>
		<div @click="deletePost">{{ marks.selected ? "Do not delete" : "Delete" }}</div>
		<div>Cancel</div>
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { usePostMarksStore } from "@/stores/postMarks"

	const emit = defineEmits(["cancel"])
	const props = defineProps({ postId: Number })
	const store = usePostMarksStore()

	function hidePost() {
		store.toggleHide(props.postId)
	}

	function bookmarkPost() {
		store.toggleBookmark(props.postId)
	}

	function deletePost() {
		store.toggleSelect(props.postId)
		window.emitter.emit("post-delete-button-click")
	}

	const marks = computed(() => store.postMarks(props.postId))
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
