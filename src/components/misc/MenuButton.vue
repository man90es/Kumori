<template>
	<button @click="dispatchEvent">
		<img class="icon" :src="src" />
	</button>
</template>

<script setup>
	import { computed } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useScroll } from "@/hooks/scroll"
	import { useStore } from "vuex"

	const props = defineProps({ icon: String })
	const store = useStore()
	const route = useRoute()
	const router = useRouter()

	const images = require.context("@/assets/icons", false, /\.svg$/)
	const { scrollToTop, scrollToBottom } = useScroll()
	const src = computed(() => {
		return images(`./${props.icon}.svg`)
	})

	function dispatchEvent() {
		switch (props.icon) {
			case "chat":
				return window.emitter.emit("menu-chat-button-click", {
					boardName: route.params.boardName,
					threadId: parseInt(route.params.threadId),
					threadNumber:
						route.name === "thread"
							? store.state.threads[parseInt(route.params.threadId)].head.number
							: null,
				})

			case "star":
				return router.push({ name: "bookmarks" })

			case "home":
				return router.push({ name: "home" })

			case "up":
				return scrollToTop()

			case "down":
				return scrollToBottom()

			default:
				return window.emitter.emit(`menu-${props.icon}-button-click`, {})
		}
	}
</script>

<style scoped>
	button {
		height: 3.5rem;
		width: 3.5rem;
		justify-content: center;
		align-items: center;
		display: flex;
		background-color: var(--card-color);
		border: none;
	}
</style>
