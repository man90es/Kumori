<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<ThreadItem
				:key="threadId"
				:pageSize="$store.state.settings.repliesOnBoardPage"
				:threadId="threadId"
				v-for="threadId in threadList"
			/>
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { computed, watch } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import ThreadItem from "@/components/misc/ThreadItem"

	const store = useStore()
	const route = useRoute()
	const threadsPerPage = 10

	const threadList = computed(() => {
		return store.state.threadLists[route.params.boardName]
	})

	API.thread.requestMany({ boardName: route.params.boardName, count: threadsPerPage })
	watch([() => route.name, () => route.params.boardName], ([routeName, boardName]) => {
		if (routeName !== "board") return
		API.thread.requestMany({ boardName, count: threadsPerPage })
	})
</script>

<style>
	#board {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
