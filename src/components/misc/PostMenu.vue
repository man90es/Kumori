<template>
	<div class="postMenu" @click="parent.hideMenu">
		<div @click="hideHandler">{{$store.state.hiddenPosts.includes(parent.post.id) ? 'Show': 'Hide'}}</div>
		<div>Add to Starred</div>
		<div @click="deleteHandler">{{$store.state.selectedForDeletionPosts.includes(parent.post.id) ? 'Do not delete': 'Delete'}}</div>
		<div>Edit</div>
	</div>
</template>

<script>
	export default {
		name: 'PostMenu',
		props: [
			'parent'
		],
		methods: {
			hideHandler() {
				this.$store.commit('toggleHidePost', this.parent.post.id)
			},

			deleteHandler() {
				this.$store.commit('toggleSelectedForDeletionPost', this.parent.post.id)
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
		padding: calc(var(--gap-size) / 2);
	}

	.postMenu div:hover {
		background-color: var(--card-secondary-color);
	}
</style>
