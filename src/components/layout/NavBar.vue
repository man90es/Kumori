<template>
	<nav v-if="landscape">
		<RouterLink to="/">{{ title }}</RouterLink>
		<RouterLink
			:key="boardName"
			:to="{ name: 'board', params: { boardName } }"
			v-for="boardName in $store.state.boardList"
		>
			/{{ boardName }}
			<span v-if="!settings.compactBoardMenu"> — {{ $store.state.boards[boardName].title }}</span>
		</RouterLink>
	</nav>
</template>

<script setup>
	import { useSettingsStore } from "@/stores/settings"
	import { useViewMode } from "@/hooks/viewMode"

	const settings = useSettingsStore()

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
