<template>
	<div>
		<a>{{this.originalData}}</a>
		<span>It may be not safe.</span>
		<span class="row">
			<button type="button" @click="okHandler">Ok</button><button type="button" @click="cancelHandler">Cancel</button>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'UnsafeLinkModal',
		props: [
			'parent',
			'originalData'
		],
		methods: {
			okHandler() {
				window.open(this.originalData)
				this.parent.close()
			},

			cancelHandler() {
				this.parent.close()
			}
		},
		created() {
			this.parent.setParams({
				header: 'Are you sure you want to open this link?',
				closeable: false,
				draggable: false,
				backdrop: true
			})
		}
	}
</script>

<style scoped>
	div {
		display: flex;
		flex-direction: column !important;
		height: 100% !important;
	}

	.row {
		margin-top: 0.25rem;
		flex-direction: row !important;
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