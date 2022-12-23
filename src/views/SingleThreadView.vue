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
	import { computed, onMounted, onUnmounted } from "vue"
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

	const threadId = parseInt(route.params.threadId)
	const threadReady = computed(() => Boolean(store.state.threads[threadId]))
	if (!threadReady.value) {
		API.thread.request({ threadId })
	}

	function threadDeletedEventCatcher({ event, type, data }) {
		return "deleted" === event && "thread" === type && threadId === data.id
	}

	onMounted(() => {
		API.addInMessageListener(threadDeletedEventCatcher, ({ data }) => {
			router.push({ name: "board", params: { boardName: data.boardName } })
		})
	})

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
