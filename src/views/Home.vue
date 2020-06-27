<template>
	<div id='home'>
		<img src='logo.png'>
		<div id='links'>
			<router-link :key='boardName' :to='{name: "board", params: {boardName}}' v-for='(board, boardName) in $store.state.boards'>/{{boardName}}</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home'
	}
</script>

<style scoped>
	#home{
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