<template>
	<modal-shell :header="$t('deletePostModal.header', selectedPostCount, { count: selectedPostCount })" :closeHandler="close">
		<div>
			<span>{{ $t("deletePostModal.warning1", selectedPostCount) }}</span>
			<span>{{ $t("deletePostModal.warning2") }}</span>
			<span class="row">
				<button type="button" @click="okHandler">{{ $t("ok") }}</button>
				<button type="button" @click="close">{{ $t("cancel") }}</button>
			</span>
		</div>
	</modal-shell>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"

	import ModalShell from "./ModalShell.vue"

	import API from "../../api.js"

	const store = useStore()
	const props = defineProps({ closeHandler: { type: Function, required: true } })

	const selectedPostCount = computed(() => {
		const selectedPostCount = store.state.selectedPostsList.length

		return selectedPostCount > 0 ? selectedPostCount : props.closeHandler()
	})

	function okHandler() {
		API.post.deleteMany(store.state.selectedPostsList.map(postId => ({ postId })))
		close()
	}

	function close() {
		store.commit("clearSelected")
		props.closeHandler()
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
