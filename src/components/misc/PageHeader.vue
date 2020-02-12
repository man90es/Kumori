<template>
	<header>
		<router-link :to='{name: "board", params: {boardId: board.id}}'>
			<div>/{{board.id}}/ — {{board.title}}</div>
			<div>{{board.subtitle}}</div>
		</router-link>
	</header>
</template>

<script>
	export default {
		name: 'PageHeader',
		props: ['board']
	}
</script>

<style scoped>
	header{
		background-color: var(--card-color);
		margin-bottom: calc(var(--gap-size) / 4);
		padding: calc(var(--gap-size) / 2);
		display: flex;
	}

	div:first-child{
		color: var(--text-color);
		font-size: 1.5rem;
	}
</style>
