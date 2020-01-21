<template>
	<div id='MenuBar'>
		<div>
			<MenuButton />
			<MenuButton />
			<MenuButton />
			<MenuButton />
		</div>
		<div>
			<MenuButton />
			<MenuButton />
			<MenuButton />
			<MenuButton />
		</div>
	</div>
</template>

<script>
	import MenuButton from '../misc/MenuButton.vue'

	export default {
		name: 'MenuBar',
		components: {
			MenuButton
		}
	}
</script>

<style scoped>
	#MenuBar{
		display: flex;
		flex-direction: column;
		height: 100vh;
		position: sticky;
		justify-content: space-between;
	}

	button{
		margin: 0.5rem 0;
	}
</style>
