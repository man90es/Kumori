<template>
	<main>
		<header v-if="board">
			<div>
				<router-link :to="{ name: 'board' }">
					<div class="title" v-if="['board', 'thread'].includes($route.name)">{{ $t("pageHeader.boardTitle", { boardName: board.name, boardTitle: board.title }) }}</div>
					<div class="title" v-if="$route.name == 'feed'">{{ $t("pageHeader.feedTitle", { boardName: board.name, boardTitle: board.title }) }}</div>
					<div>{{ $t("pageHeader.boardDescription", { boardDescription: board.subtitle }) }}</div>
				</router-link>
			</div>

			<div>
				<router-link class="feedLink" v-if="$route.name === 'board'" :to="{ name: 'feed' }">
					<img class="icon" src="../../assets/icons/view_list.svg">
				</router-link>
			</div>
		</header>
		<header v-else-if="$route.name === 'bookmarks'">
			<div>
				<div class="title">{{ $t("pageHeader.bookmarksTitle") }}</div>
				<div>{{ $t("pageHeader.bookmarksDescription") }}</div>
			</div>
		</header>

		<slot />
	</main>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	const store = useStore()
	const route = useRoute()
	const board = computed(() => store.state.boards[route.params.boardName])
</script>

<style lang="scss">
	main {
		width: 50em;
		margin: 0 var(--gap-size);
	}

	header {
		background-color: var(--card-color);
		margin-bottom: calc(var(--gap-size) / 2);
		padding: var(--gap-size);
		display: flex;
		justify-content: space-between;

		& > div:last-child {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.title {
			font-size: 1.5rem;
			color: var(--text-color);
		}

		.feedLink img {
			height: 2em;
		}
	}

</style>
