<template>
	<Shell :header="$t('unsafeLinkModal.header')" :closeable="false" :draggable="false" :closeHandler="close">
		<div>
			<a>{{link}}</a>
			<span>{{ $t("unsafeLinkModal.warning") }}</span>
			<span class="row">
				<button type="button" @click="okHandler">{{ $t("ok") }}</button>
				<button type="button" @click="close">{{ $t("cancel") }}</button>
			</span>
		</div>
	</Shell>
</template>

<script setup>
	import { defineProps } from "vue"

	import Shell from "./Shell.vue"

	const { link, closeHandler, setBackdrop } = defineProps({
		link:         { type: String,   required: true },
		closeHandler: { type: Function, required: true },
		setBackdrop:  { type: Function, required: true },
	})

	function okHandler() {
		window.open(link)
		close()
	}

	function close() {
		setBackdrop(false)
		closeHandler()
	}

	setBackdrop(true)
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
