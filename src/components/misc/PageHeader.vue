<template>
	<header v-if="board">
		<div>
			<router-link :to="{name: 'board', params: {boardName: board.name}}">
				<div class="title" v-if="type === 'board'">/{{board.name}}/ — {{board.title}}</div>
				<div class="title" v-if="type === 'feed'">/{{board.name}}/'s feed — {{board.title}}</div>
				<div>{{board.subtitle}}</div>
			</router-link>	
		</div>

		<div>
			<router-link class="feedLink" v-if="type === 'board'" :to="{name: 'feed', params: {boardName: board.name}}">
				<img class="icon" src="../../assets/icons/view_list.svg">
			</router-link>
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
		},
		props: [
			'type'
		]
	}
</script>

<style scoped>
	header{
		background-color: var(--card-color);
		margin-bottom: calc(var(--gap-size) / 4);
		padding: calc(var(--gap-size) / 2);
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
