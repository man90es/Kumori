<template>
	<ModalShell :closeHandler="close" :header="header">
		<div>
			<span>{{ warning }}</span>
			<span>Deletion of an OP deletes the whole thread.</span>
			<span class="row">
				<button type="button" @click="okHandler">Ok</button>
				<button type="button" @click="close">Cancel</button>
			</span>
		</div>
	</ModalShell>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"
	import API from "@/api"
	import ModalShell from "@/components/misc/ModalShell"

	const store = useStore()
	const props = defineProps({ closeHandler: { type: Function, required: true } })

	const selectedPostCount = computed(() => {
		const selectedPostCount = store.state.selectedPostsList.length
		return selectedPostCount > 0 ? selectedPostCount : props.closeHandler()
	})

	function okHandler() {
		API.post.deleteMany(store.state.selectedPostsList.map((postId) => ({ postId })))
		close()
	}

	function close() {
		store.commit("clearSelected")
		props.closeHandler()
	}

	const header = computed(
		() => `Delete ${selectedPostCount.value} selected post${selectedPostCount.value > 1 ? "s" : ""}?`
	)
	const warning = computed(
		() =>
			`This action will fail if you don't have enough rights to delete ${
				selectedPostCount.value > 1 ? "these posts" : "this post"
			}.`
	)
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
