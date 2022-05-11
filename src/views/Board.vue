<template>
	<div id="board">
		<nav-bar />
		<main-section>
			<thread-item :key="threadId" :threadId="threadId" :pageSize="$store.state.settings.repliesOnBoardPage" v-for="threadId in threadList"/>
		</main-section>
		<menu-bar />
	</div>
</template>

<script setup>
	import { computed, watch } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	import MainSection from "../components/layout/MainSection.vue"
	import MenuBar from "../components/layout/MenuBar.vue"
	import NavBar from "../components/layout/NavBar.vue"
	import ThreadItem from "../components/misc/ThreadItem.vue"

	import API from "../api.js"

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
	#board{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
