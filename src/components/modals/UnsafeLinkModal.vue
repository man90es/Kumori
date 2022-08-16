<template>
	<ModalShell
		:closeable="false"
		:closeHandler="close"
		:draggable="false"
		header="Are you sure you want to open this link?"
	>
		<div>
			<a>{{ link }}</a>
			<span>It may be not safe</span>
			<span class="row">
				<button type="button" @click="okHandler">Ok</button>
				<button type="button" @click="close">Cancel</button>
			</span>
		</div>
	</ModalShell>
</template>

<script setup>
	import ModalShell from "@/components/misc/ModalShell"

	const props = defineProps({
		link: { type: String, required: true },
		closeHandler: { type: Function, required: true },
		setBackdrop: { type: Function, required: true },
	})

	function okHandler() {
		window.open(props.link)
		close()
	}

	function close() {
		props.setBackdrop(false)
		props.closeHandler()
	}

	props.setBackdrop(true)
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
