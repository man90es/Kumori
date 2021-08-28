<template>
	<div id="menu-bar" :class="{ mobile, visible }">
		<div>
			<MenuButton icon="up" />
			<MenuButton icon="search" />
			<MenuButton icon="settings" />
		</div>
		<div>
			<MenuButton v-if="mobile" icon="home" />
			<MenuButton v-if="$route.name !== 'bookmarks'" icon="chat" />
			<MenuButton v-if="$route.name !== 'bookmarks'" icon="star" />
			<MenuButton icon="down" />
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"

	import MenuButton from "../misc/MenuButton.vue"

	const visible = ref(false)
	const mobile = window.innerWidth < window.innerHeight

	emitter.on("swipe-left", () => visible.value = true)
	emitter.on("swipe-right", () => visible.value = false)
</script>

<style lang="scss">
	#menu-bar {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		height: 100vh;
		top: 0;
		position: sticky;

		button {
			margin: var(--gap-size) 0;
		}

		&.mobile {
			position: fixed;
			right: -3.5em;
			transition-duration: .2s;

			&.visible {
				right: var(--gap-size);
			}

			button {
				border: 1px solid var(--background-color);
			}
		}
	}
</style>
