<template>
	<button @click="dispatchEvent" :class="$style.root">
		<img class="icon" :src="src" />
	</button>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useScroll } from "@/hooks"
	import { useStore } from "vuex"

	const props = defineProps<{ icon: string }>()
	const store = useStore()
	const route = useRoute()
	const router = useRouter()

	const images = require.context("@/assets/icons", false, /\.svg$/)
	const { scrollToTop, scrollToBottom } = useScroll()
	const src = computed(() => images(`./${props.icon}.svg`))

	function dispatchEvent() {
		const boardName = Array.isArray(route.params.boardName) ? route.params.boardName[0] : route.params.boardName || undefined
		const threadId = parseInt(Array.isArray(route.params.threadId) ? route.params.threadId[0] : route.params.threadId) || undefined

		switch (props.icon) {
			case "chat":
				return window.emitter.emit("menu-chat-button-click", {
					boardName,
					threadId,
					threadNumber: route.name === "thread" && threadId ? store.state.threads[threadId].head.number : undefined,
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

<style module>
	.root {
		align-items: center;
		background-color: var(--card-color);
		border: none;
		display: flex;
		height: 3.5rem;
		justify-content: center;
		width: 3.5rem;
	}
</style>
