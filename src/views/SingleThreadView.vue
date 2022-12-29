<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<ThreadItem v-if="threadReady" :threadId="threadId" :pageSize="500" :tail="false" />
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { computed, onMounted, onUnmounted, watch } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import ThreadItem from "@/components/misc/ThreadItem"

	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	const threadId = computed(() => parseInt(route.params.threadId))
	const threadReady = computed(() => Boolean(store.state.threads[threadId.value]))

	function threadDeletedEventCatcher({ event, type, data }) {
		return "deleted" === event && "thread" === type && threadId.value === data.id
	}

	function requestThread() {
		if (threadReady.value) {
			return
		}

		API.removeInMessageListener(threadDeletedEventCatcher)
		API.addInMessageListener(threadDeletedEventCatcher, ({ data }) => {
			router.push({ name: "board", params: { boardName: data.boardName } })
		})

		API.thread.request({ threadId: threadId.value })
	}

	// Request thread when the page is opened
	onMounted(requestThread)

	// Request thread when user navigates to another thread
	watch(() => route.params.threadId, requestThread)

	onUnmounted(() => {
		API.removeInMessageListener(threadDeletedEventCatcher)
	})
</script>

<style>
	#board {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
