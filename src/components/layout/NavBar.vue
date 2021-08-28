<template>
	<nav v-if="!mobile">
		<router-link to="/">{{ title }}</router-link>
		<router-link :key="boardName" :to="{name: 'board', params: {boardName}}" v-for="boardName in $store.state.boardList">
			/{{boardName}}<span v-if="!$store.state.compactBoardMenu"> — {{$store.state.boards[boardName].title}}</span>
		</router-link>
	</nav>
</template>

<script setup>
	const mobile = window.innerWidth < window.innerHeight
	const title = process.env.VUE_APP_TITLE
</script>

<style lang="scss">
	nav {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		text-align: right;

		a:first-child {
			color: var(--text-color);
			font-size: 2rem;
			font-weight: bold;
		}
	}
</style>
