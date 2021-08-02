<template>
	<Shell :header="$t('unsafeLinkModal.header')" :closeable="false" :draggable="false">
		<div>
			<a>{{link}}</a>
			<span>{{ $t("unsafeLinkModal.warning") }}</span>
			<span class="row">
				<button type="button" @click="okHandler">{{ $t("ok") }}</button><button type="button" @click="cancelHandler">{{ $t("cancel") }}</button>
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
