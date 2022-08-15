<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<ThreadItem :threadId="parseInt($route.params.threadId)" :pageSize="500" :tail="false" />
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import ThreadItem from "@/components/misc/ThreadItem"

	const store = useStore()
	const route = useRoute()
	const threadId = parseInt(route.params.threadId)

	if (undefined === store.state.threads[threadId]) {
		API.thread.request({ threadId })
	}
</script>

<style>
	#board {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
