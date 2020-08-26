<template>
	<div>
		<span>This action may fail if you don't have right do delete those posts.</span>
		<span class="row">
			<button type="button" @click="okHandler">Ok</button><button type="button" @click="cancelHandler">Cancel</button>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'DeletePostModal',
		props: [
			'parent',
			'originalData'
		],
		data() {
			return {
				updatedData: null
			}
		},
		methods: {
			okHandler() {
				this.parent.close()
			},

			cancelHandler() {
				this.parent.close()
			}
		},
		computed: {
			postsToDelete() {
				return this.updatedData || this.originalData
			}
		},
		created() {
			this.parent.setParams({
				header: 'Delete selected posts?'
			})

			this.updatedData = this.originalData
			this.$bus.on(`modal-${this.parent.key}-data-update`, (data) => {
				this.updatedData = this.updatedData.concat(data).filter((value, index, self) => {
					return self.indexOf(value) === index
				})
			})
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