<template>
	<div id="board">
		<nav-bar />
		<main-section>
			<thread-item :threadId="parseInt($route.params.threadId)" :pageSize="500" :tail="false" />
		</main-section>
		<menu-bar />
	</div>
</template>

<script setup>
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	import MainSection from "../components/layout/MainSection.vue"
	import MenuBar from "../components/layout/MenuBar.vue"
	import NavBar from "../components/layout/NavBar.vue"
	import ThreadItem from "../components/misc/ThreadItem.vue"

	import API from "../api.js"

	const store = useStore()
	const route = useRoute()
	const threadId = parseInt(route.params.threadId)

	if (undefined === store.state.threads[threadId]) {
		API.thread.request({ threadId })
	}
</script>

<style>
	#board{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
