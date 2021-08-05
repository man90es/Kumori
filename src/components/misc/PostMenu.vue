<template>
	<div class="postMenu" @click="$parent.hideMenu">
		<div @click="hideHandler">{{ $parent.hidden ? $t("postMenu.show") : $t("postMenu.hide") }}</div>
		<div @click="bookmarkHandler">{{ $parent.bookmarked ? $t("postMenu.unbookmark") : $t("postMenu.bookmark") }}</div>
		<div @click="deleteHandler">{{ $parent.selected ? $t("postMenu.undelete") : $t("postMenu.delete") }}</div>
		<div>{{ $t("cancel") }}</div>
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
				emitter.emit('post-delete-button-click')
			}
		}
	}
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
