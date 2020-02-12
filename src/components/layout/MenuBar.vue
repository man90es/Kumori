<template>
	<div id='MenuBar'>
		<div>
			<MenuButton :icon='"up"' />
			<MenuButton :icon='"search"' />
			<MenuButton :icon='"settings"' />
		</div>
		<div>
			<MenuButton :icon='"chat"' />
			<MenuButton :icon='"star"' />
			<MenuButton :icon='"down"' />
		</div>
	</div>
</template>

<script>
	import MenuButton from '../misc/MenuButton.vue'

	export default {
		name: 'MenuBar',
		components: {
			MenuButton
		},
		created() {
			this.$bus.on('menu-up-button-click', () => scrollTo({top: 0, behavior: 'smooth'}))
			this.$bus.on('menu-down-button-click', () => scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}))
		},
	}
</script>

<style scoped>
	#MenuBar{
		display: flex;
		flex-direction: column;
		height: 100vh;
		top: 0;
		position: sticky;
		justify-content: space-between;
	}

	button{
		margin: calc(var(--gap-size) / 2) 0;
	}
</style>
