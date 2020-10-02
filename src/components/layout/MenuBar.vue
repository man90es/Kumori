<template>
	<div id="MenuBar" :class="{mobile, visible}">
		<div>
			<MenuButton icon="up" />
			<MenuButton icon="search" />
			<MenuButton icon="settings" />
		</div>
		<div>
			<MenuButton v-if="mobile" icon="home" />
			<MenuButton v-if="$route.name != 'bookmarks'" icon="chat" />
			<MenuButton v-if="$route.name != 'bookmarks'" icon="star" />
			<MenuButton icon="down" />
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
		data() {
			return {
				mobile: window.innerWidth < window.innerHeight,
				visible: false // Has no effect in desktop version
			}
		},
		created() {
			this.$bus.on('swipe-left', () => this.visible = true)
			this.$bus.on('swipe-right', () => this.visible = false)
		},
	}
</script>

<style scoped>
	#MenuBar{
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		height: 100vh;
		top: 0;
		position: sticky;
	}

	#MenuBar.mobile {
		position: fixed;
		right: -3.5em;
		transition-duration: .2s;
	}

	#MenuBar.mobile button {
		border: 1px solid var(--background-color);
	}

	#MenuBar.mobile.visible {
		right: var(--gap-size);
	}

	button{
		margin: var(--gap-size) 0;
	}
</style>
