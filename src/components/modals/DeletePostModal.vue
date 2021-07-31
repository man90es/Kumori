<template>
	<Shell :header="`Delete ${selectedPostCount} selected post${selectedPostCount > 1 ? 's' : ''}?`">
		<div>
			<span>This action may fail if you don't have right do delete {{selectedPostCount > 1 ? 'those posts' : 'that post'}}.</span>
			<span>Deletion of OP deletes thread too.</span>
			<span class="row">
				<button type="button" @click="okHandler">Ok</button><button type="button" @click="close">Cancel</button>
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

<style scoped>
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
	}

	button:hover {
		background-color: #fff1;
	}
</style>
