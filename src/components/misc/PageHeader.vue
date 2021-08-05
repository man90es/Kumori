<template>
	<header v-if="board">
		<div>
			<router-link :to="{name: 'board'}">
				<div class="title" v-if="['board', 'thread'].includes($route.name)">{{ $t("pageHeader.boardTitle", { boardName: board.name, boardTitle: board.title }) }}</div>
				<div class="title" v-if="$route.name == 'feed'">{{ $t("pageHeader.feedTitle", { boardName: board.name, boardTitle: board.title }) }}</div>
				<div>{{ $t("pageHeader.boardDescription", { boardDescription: board.subtitle }) }}</div>
			</router-link>
		</div>

		<div>
			<router-link class="feedLink" v-if="$route.name == 'board'" :to="{name: 'feed'}">
				<img class="icon" src="../../assets/icons/view_list.svg">
			</router-link>
		</div>
	</header>
	<header v-else-if="$route.name == 'bookmarks'">
		<div>
			<div>
				<div class="title">{{ $t("pageHeader.bookmarksTitle") }}</div>
				<div>{{ $t("pageHeader.bookmarksDescription") }}</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'PageHeader',
		computed: {
			board: function() {
				return this.$store.state.boards[this.$route.params.boardName]
			}
		}
	}
</script>

<style scoped lang="scss">
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
	}

	.title {
		font-size: 1.5rem;
		color: var(--text-color);
	}

	.feedLink img {
		height: 2em;
	}
</style>
