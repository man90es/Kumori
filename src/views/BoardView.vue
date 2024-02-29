<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<div v-if="0 === meta.threadList.length" id="empty-banner" @click="openPostingForm">
				<!--
					TODO: This block always pops while the page is loading
					Maybe there should be some boolean variable that tells
					it whether there are no threads or if they haven't loaded yet.
				-->
				Nothing to see here, folks. Yet...<br />
				Click here to create a thread.
			</div>
			<ThreadItem :key="threadId" :pageSize="settings.repliesOnBoardPage" :threadId="threadId" v-for="threadId in meta.threadList" />
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { computed, inject, onMounted, watch } from "vue"
	import { useAtBottom } from "@/hooks/atBottom"
	import { useRoute } from "vue-router"
	import { useSettingsStore } from "@/stores/settings"
	import { useStore } from "vuex"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import ThreadItem from "@/components/misc/ThreadItem"

	const API = inject("API")
	const route = useRoute()
	const settings = useSettingsStore()
	const store = useStore()

	const meta = computed(() => ({
		...(store.state.boards[route.params.boardName] || {}),
		threadList: store.state.threadLists[route.params.boardName] || []
	}))

	function openPostingForm() {
		window.emitter.emit("menu-chat-button-click", { boardName: route.params.boardName })
	}

	function requestThreads() {
		const pageSize = 10
		const totalPages = Math.ceil(meta.value.threadCount / pageSize)
		const requestedPages = Math.ceil(meta.value.threadList.length / pageSize)

		// Return if user navigated to another page type
		// but this component hasn't dissolved yet
		if ("board" !== route.name) {
			return
		}

		// Return if all threads fetched already
		if (totalPages <= requestedPages) {
			return
		}

		API.thread.requestMany({
			boardName: route.params.boardName,
			count: pageSize,
			page: requestedPages,
		})
	}

	// Request threads when the page is opened
	onMounted(requestThreads)

	// Request threads when user navigates to another board
	watch(() => route.params.boardName, requestThreads)

	// Request threads when user reaches the bottom of the page
	const atBottom = useAtBottom()
	watch(() => atBottom.value, reached => reached && requestThreads())
</script>

<style scoped>
	#board {
		display: flex;
		justify-content: center;
		width: 100vw;
	}

	#empty-banner {
		background-color: var(--card-color);
		cursor: pointer;
		padding: var(--gap-size);
	}
</style>
