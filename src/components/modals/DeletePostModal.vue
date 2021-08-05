<template>
	<Shell :header="$t('deletePostModal.header', selectedPostCount, { count: selectedPostCount })">
		<div>
			<span>{{ $t("deletePostModal.warning1", selectedPostCount) }}</span>
			<span>{{ $t("deletePostModal.warning2") }}</span>
			<span class="row">
				<button type="button" @click="okHandler">{{ $t("ok") }}</button>
				<button type="button" @click="close">{{ $t("cancel") }}</button>
			</span>
		</div>
	</Shell>
</template>

<script>
	import API from '../../api'
	import Shell from './Shell.vue'

	export default {
		name: 'DeletePostModal',
		components: {
			Shell
		},
		computed: {
			selectedPostCount: function() {
				const selectedPostCount = this.$store.state.selectedPostsList.length

				if (selectedPostCount > 0) {
					return selectedPostCount
				} else {
					this.close()
				}
			}
		},
		methods: {
			okHandler() {
				API.post.deleteMany(this.$store.state.selectedPostsList.map(postId => { return { postId } }))
				this.cancelHandler()
			},

			close() {
				this.$parent.closeByKey(this._.vnode.key)
				this.$store.commit('clearSelected')
			},
		}
	}
</script>

<style scoped lang="scss">
	div {
		display: flex;
		text-align: center;
		flex-direction: column;
	}

	.row {
		margin-top: 0.25rem;
		flex-direction: row;
	}

	button {
		padding: 0.5rem;
		color: var(--text-color);
		font-size: 1rem;
		width: 50%;

		&:hover {
			background-color: #fff1;
		}
	}
</style>
