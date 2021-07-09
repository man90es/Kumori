<template>
	<div v-if="!mobile">
		<router-link to="/">{{ title }}</router-link>
		<router-link :key="boardName" :to="{name: 'board', params: {boardName}}" v-for="boardName in $store.state.boardList">/{{boardName}}<span v-if="!$store.state.compactBoardMenu"> — {{$store.state.boards[boardName].title}}</span></router-link>
	</div>
</template>

<script>

	export default {
		name: 'NavBar',
		data() {
			return {
				mobile: window.innerWidth < window.innerHeight,
				title: process.env.VUE_APP_TITLE,
			}
		}
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
