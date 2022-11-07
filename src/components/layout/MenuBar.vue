<template>
	<div id="menu-bar" :class="{ portrait, visible }">
		<div>
			<MenuButton icon="up" title="Scroll to top" />
			<!-- <MenuButton icon="search" /> -->
			<MenuButton icon="settings" title="Settings" />
			<MenuButton v-if="loggedOn" icon="person" title="My info" />
		</div>
		<div>
			<MenuButton v-if="portrait" icon="home" title="Home" />
			<MenuButton v-if="$route.name !== 'bookmarks'" icon="chat" title="New post" />
			<MenuButton v-if="$route.name !== 'bookmarks'" icon="star" title="Bookmarks" />
			<MenuButton icon="down" title="Scroll to bottom" />
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from "vue"
	import { useUserStore } from "@/stores/user"
	import { useViewMode } from "@/hooks/viewMode"
	import MenuButton from "@/components/misc/MenuButton"

	const { portrait } = useViewMode()
	const visible = ref(false)

	const user = useUserStore()
	const loggedOn = computed(() => Boolean(user.id))

	window.emitter.on("swipe-left", () => (visible.value = true))
	window.emitter.on("swipe-right", () => (visible.value = false))
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

		&.portrait {
			position: fixed;
			right: -3.5em;
			transition-duration: 0.2s;

			&.visible {
				right: var(--gap-size);
			}

			button {
				border: 1px solid var(--background-color);
			}
		}
	}
</style>
