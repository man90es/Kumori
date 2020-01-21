<template>
	<div id='Home'>
		<img src='logo.png'>
		<div id='links'>
			<router-link :key='board.id' :to='{name: "board", params: {boardID: board.id}}' v-for='board in boards'>/{{board.id}}</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		props: ["boards"]
	}
</script>

<style scoped>
	#Home{
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#links {
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 2rem;
		position: fixed;
		bottom: 1rem;
	}

	#links a {
		font-weight: bold;
		color: #a8afbc;
	}
</style>