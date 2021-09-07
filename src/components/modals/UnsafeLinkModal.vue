<template>
	<Shell :header="$t('unsafeLinkModal.header')" :closeable="false" :draggable="false" :closeHandler="close">
		<div>
			<a>{{link}}</a>
			<span>{{ $t("unsafeLinkModal.warning") }}</span>
			<span class="row">
				<button type="button" @click="okHandler">{{ $t("ok") }}</button>
				<button type="button" @click="cancelHandler">{{ $t("cancel") }}</button>
			</span>
		</div>
	</Shell>
</template>

<script>
	import Shell from './Shell.vue'

	export default {
		name: 'UnsafeLinkModal',
		props: {
			link: {
				type: String,
				required: true,
			},
			closeHandler: {
				type: Function,
				required: true,
			},
			setBackdrop: {
				type: Function,
				required: true,
			},
		},
		components: {
			Shell
		},
		methods: {
			okHandler() {
				window.open(this.link)
				this.close()
			},

			cancelHandler() {
				this.close()
			},

			close() {
				this.setBackdrop(false)
				this.closeHandler()
			},
		},
		created() {
			this.setBackdrop(true)
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
