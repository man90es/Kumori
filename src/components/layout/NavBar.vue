<template>
	<div id='NavBar'>
		<router-link to="/">home</router-link>
		<router-link :key='board.id' :to='{name: "board", params: {board: board.id}}' v-for='board in boards'>/{{board.id}}</router-link>
	</div>
</template>

<script>
	export default {
		name: 'NavBar',
		props: ["boards"]
	}
</script>

<style scoped>
	#NavBar{
		height: 100vh;
		position: sticky;
		display: flex;
		flex-direction: column;
		text-align: right;
		top: 0;
	}
</style>
