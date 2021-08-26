<template>
	<div id="feed">
		<NavBar />
		<MainSection>
			<Post :key="postId" :postId="postId" v-for="postId in feedList"/>
		</MainSection>
		<MenuBar />

		<ModalsLayer />
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	import MainSection from "../components/layout/MainSection.vue"
	import NavBar from "../components/layout/NavBar.vue"
	import MenuBar from "../components/layout/MenuBar.vue"
	import ModalsLayer from "../components/layers/ModalsLayer.vue"
	import Post from "../components/misc/Post.vue"

	import API from "../api.js"

	const store = useStore()
	const route = useRoute()
	const postsPerPage = 10

	const feedList = computed(() => {
		return store.state.feedLists[route.params.boardName]
	})

	API.post.requestMany({ boardName: route.params.boardName, count: postsPerPage })
	emitter.on("page-end-reached", () => {
		if (route.name !== "feed") return
		API.post.requestMany({ boardName: route.params.boardName, count: postsPerPage, page: feedList.value.length / postsPerPage })
	})
</script>

<style>
	#feed{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
