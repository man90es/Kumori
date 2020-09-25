<template>
	<div class="postMenu" @click="$parent.hideMenu">
		<div @click="hideHandler">{{$parent.hidden ? 'Show': 'Hide'}}</div>
		<div @click="bookmarkHandler">{{$parent.bookmarked ? 'Remove from bookmarks': 'Bookmark'}}</div>
		<div @click="deleteHandler">{{$parent.selected ? 'Do not delete': 'Delete'}}</div>
		<div>Cancel</div>
	</div>
</template>

<script>
	export default {
		name: 'PostMenu',
		methods: {
			hideHandler() {
				this.$store.commit('toggleHidden', this.$parent.post.id)
			},

			bookmarkHandler() {
				this.$store.commit('toggleBookmarked', this.$parent.post.id)
			},

			deleteHandler() {
				this.$store.commit('toggleSelected', this.$parent.post.id)
				this.$bus.emit('post-delete-button-click')
			}
		}
	}
</script>

<style scoped>
	.postMenu {
		position: absolute;
		background-color: var(--card-color);
		z-index: 99;
	}

	.postMenu div {
		cursor: pointer;
		padding: var(--gap-size);
	}

	.postMenu div:hover {
		background-color: var(--card-secondary-color);
	}
</style>
