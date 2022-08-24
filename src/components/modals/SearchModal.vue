<template>
	<ModalShell header="Search">
		<form @submit.prevent="submit">
			<div class="row">
				<input id="searchQuery" placeholder="Query" title="Query" type="text" v-model="query" />
				<button>
					<img class="icon" src="@/assets/icons/search.svg" title="Search" />
				</button>
			</div>
			<div class="row">
				<input placeholder="Board name" title="Board name" type="text" v-model="boardName" />
				<input min="1" placeholder="Thread number" title="Thread number" type="number" v-model="threadNumber" />
			</div>
			<div class="row">
				<input type="date" v-model="after" title="After" />
				<input type="date" v-model="before" title="Before" />
			</div>
		</form>
	</ModalShell>
</template>

<script setup>
	import { ref } from "vue"
	import API from "@/api"
	import ModalShell from "@/components/misc/ModalShell"

	const query = ref("")
	const boardName = ref("")
	const threadNumber = ref(null)
	const after = ref(null)
	const before = ref(null)

	function submit() {
		API.post.findMany({
			query: query.value,
			parameters: {
				boardName: boardName.value,
				threadNumber: threadNumber.value,
				after: after.value,
				before: before.value,
			},
		})
	}
</script>

<style scoped lang="scss">
	.icon {
		cursor: pointer;
	}

	input {
		height: 100%;
		border: none;
		padding: 2%;
		box-sizing: border-box;
		background-color: var(--background-color);
		color: var(--text-color);
		text-align: center;
		font-size: 1rem;
	}

	#searchQuery {
		width: 100%;
	}

	input:not(#searchQuery) {
		width: calc(50% - var(--gap-size) / 2);
	}

	.row {
		display: flex;
		width: 100%;

		&:not(:last-child) {
			margin-bottom: var(--gap-size);
		}

		*:not(:last-child) {
			margin-right: var(--gap-size);
		}
	}
</style>
