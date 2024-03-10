<template>
	<div :class="$style.root" @click="emit('cancel')">
		<div :class="$style.menuItem" @click="hidePost">{{ marks.hidden ? "Show" : "Hide" }}</div>
		<div :class="$style.menuItem" @click="bookmarkPost">{{ marks.bookmarked ? "Remove star" : "Add star" }}</div>
		<div :class="$style.menuItem" @click="deletePost">{{ marks.selected ? "Do not delete" : "Delete" }}</div>
		<div :class="$style.menuItem">Cancel</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { usePostMarksStore } from "@/stores"

	const emit = defineEmits(["cancel"])
	const postMarksStore = usePostMarksStore()
	const props = defineProps<{ postId: number }>()

	function hidePost() {
		postMarksStore.toggleHide(props.postId)
	}

	function bookmarkPost() {
		postMarksStore.toggleBookmark(props.postId)
	}

	function deletePost() {
		postMarksStore.toggleSelect(props.postId)
		window.emitter.emit("post-delete-button-click")
	}

	const marks = computed(() => postMarksStore.postMarks(props.postId))
</script>

<style module>
	.root {
		background-color: var(--card-color);
		position: absolute;
		z-index: 99;
	}

	.menuItem {
		cursor: pointer;
		padding: var(--gap-size);

		&:hover {
			background-color: var(--card-secondary-color);
		}
	}
</style>
