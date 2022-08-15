<template>
	<nav v-if="landscape">
		<RouterLink to="/">{{ title }}</RouterLink>
		<RouterLink
			:key="boardName"
			:to="{ name: 'board', params: { boardName } }"
			v-for="boardName in $store.state.boardList"
		>
			/{{ boardName }}
			<span v-if="!$store.state.settings.compactBoardMenu"> — {{ $store.state.boards[boardName].title }}</span>
		</RouterLink>
	</nav>
</template>

<script setup>
	import { useViewMode } from "../../hooks/viewMode.js"

	const { landscape } = useViewMode()
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
