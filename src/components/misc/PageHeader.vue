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
		background-color: #282c34;
		margin-bottom: 0.25rem;
		padding: 0.5rem;
		display: flex;
	}

	div:first-child{
		color: #a8afbc;
		font-size: 1.5rem;
	}
</style>
