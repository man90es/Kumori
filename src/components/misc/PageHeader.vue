<template>
	<header v-if="board">
		<div>/{{board.name}}/ — {{board.title}}</div>
		<div>{{board.subtitle}}</div>
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
		margin-bottom: calc(var(--gap-size) / 4);
		padding: calc(var(--gap-size) / 2);
		cursor: default;
	}

	div:first-child{
		font-size: 1.5rem;
	}

	div:last-child{
		color: var(--link-over-color);
	}
</style>
