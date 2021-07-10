<template>
	<Shell :header="'Are you sure you want to open this link?'" :closeable="false" :draggable="false">
		<div>
			<a>{{link}}</a>
			<span>It may be not safe.</span>
			<span class="row">
				<button type="button" @click="okHandler">Ok</button><button type="button" @click="cancelHandler">Cancel</button>
			</span>
		</div>
	</Shell>
</template>

<script>
	import Shell from './Shell.vue'

	export default {
		name: 'UnsafeLinkModal',
		props: [
			'link'
		],
		components: {
			Shell
		},
		methods: {
			okHandler() {
				window.open(this.link)
				this.$parent.close()
			},

			cancelHandler() {
				this.$parent.close()
			},

			close() {
				this.$parent.setBackdrop(false)
				this.$parent.closeByKey(this._.vnode.key)
			},
		},
		created() {
			this.$parent.setBackdrop(true)
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
