<template>
	<div v-if="!mobile">
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
		],
		data() {
			return {
				mobile: window.innerWidth < window.innerHeight
			}
		},
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
		color: var(--text-color);
		font-size: 2rem;
		font-weight: bold;
	}
</style>
