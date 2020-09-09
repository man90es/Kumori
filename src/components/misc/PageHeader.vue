<template>
	<header v-if="board">
		<div>
			<router-link :to="{name: 'board'}">
				<div class="title" v-if="['board', 'thread'].includes($route.name)">/{{board.name}}/ — {{board.title}}</div>
				<div class="title" v-if="$route.name == 'feed'">/{{board.name}}/'s feed — {{board.title}}</div>
				<div>{{board.subtitle}}</div>
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
				<div class="title">Bookmarks</div>
				<div>Posts you marked with a star</div>
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

<style scoped>
	header{
		background-color: var(--card-color);
		margin-bottom: calc(var(--gap-size) / 2);
		padding: var(--gap-size);
		display: flex;
		justify-content: space-between;
	}

	.title {
		font-size: 1.5rem;
		color: var(--text-color);
	}

	header > div:last-child {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.feedLink img {
		height: 2em;
	}
</style>
