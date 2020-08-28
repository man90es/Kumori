<template>
	<div>
		<span>This action may fail if you don't have right do delete {{selectedPostCount > 1 ? 'those posts' : 'that post'}}.</span>
		<span>Deletion of OP deletes thread too.</span>
		<span class="row">
			<button type="button" @click="okHandler">Ok</button><button type="button" @click="cancelHandler">Cancel</button>
		</span>
	</div>
</template>

<script>
	import { deletePosts } from '../../api'

	export default {
		name: 'DeletePostModal',
		props: [
			'parent',
			'originalData'
		],
		data() {
			return {
				selectedPostCount: 0
			}
		},
		methods: {
			okHandler() {
				let data = new FormData()

				this.$store.state.selectedForDeletionPosts.forEach((postId) => {
					let checkbox = document.createElement('input')
					checkbox.type = 'checkbox'
					checkbox.checked = true
					data.append(`selectedPost:${postId}`, checkbox)
				})

				deletePosts(data)
				this.$store.commit('clearSelectedForDeletionPosts')

				this.parent.close()
			},

			cancelHandler() {
				this.parent.close()
			},

			handleDataUpdate() {
				this.selectedPostCount = this.$store.state.selectedForDeletionPosts.length

				if (this.selectedPostCount < 1) {
					this.parent.close()
				} else {
					this.parent.setParams({
						header: `Delete ${this.selectedPostCount} selected post${this.selectedPostCount > 1 ? 's' : ''}?`
					})
				}

			}
		},
		created() {
			this.handleDataUpdate()
			this.$bus.on(`modal-${this.parent.key}-data-update`, this.handleDataUpdate)
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