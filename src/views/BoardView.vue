<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<div v-if="0 === threadList.length" id="empty-banner" @click="openPostingForm">
				<!--
					TODO: This block always pops while the page is loading
					Maybe there should be some boolean variable that tells
					it whether there are no threads or if they haven't loaded yet.
				-->
				Nothing to see here, folks. Yet...<br />
				Click here to create a thread.
			</div>
			<ThreadItem
				:key="threadId"
				:pageSize="settings.repliesOnBoardPage"
				:threadId="threadId"
				v-for="threadId in threadList"
			/>
			<!-- TODO: Pagination or infinite scrolling -->
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { computed, watchEffect } from "vue"
	import { useRoute } from "vue-router"
	import { useSettingsStore } from "@/stores/settings"
	import { useStore } from "vuex"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import ThreadItem from "@/components/misc/ThreadItem"

	const route = useRoute()
	const settings = useSettingsStore()
	const store = useStore()

	const threadList = computed(() => store.state.threadLists[route.params.boardName] || [])

	function openPostingForm() {
		window.emitter.emit("menu-chat-button-click", { boardName: route.params.boardName })
	}

	watchEffect(() => {
		"board" === route.name && API.thread.requestMany({
			boardName: route.params.boardName,
			count: 10, // TODO: Unhardcode this threads per page value
		})
	})
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
