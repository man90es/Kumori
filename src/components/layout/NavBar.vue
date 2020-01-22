<template>
	<div>
		<router-link to="/">{{siteTitle}}</router-link>
		<router-link :key='board.id' :to='{name: "board", params: {boardId: board.id}}' v-for='board in boards'>/{{board.id}}</router-link>
	</div>
</template>

<script>
	export default {
		name: 'NavBar',
		props: [
			'boards', 
			'siteTitle'
		]
	}
</script>

<style scoped>
	div{
		height: 100vh;
		position: sticky;
		display: flex;
		flex-direction: column;
		text-align: right;
		top: 0;
	}

	a:first-child{
		color: #a8afbc;
		font-size: 2rem;
		font-weight: bold;
	}
</style>
