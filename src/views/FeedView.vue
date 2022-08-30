<template>
	<div id="feed">
		<NavBar />
		<MainSection>
			<PostItem
				:key="postId"
				:postId="postId"
				v-for="postId in feedList"
			/>
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import PostItem from "@/components/misc/PostItem"

	const store = useStore()
	const route = useRoute()
	const postsPerPage = 10

	const feedList = computed(
		() => store.state.feedLists[route.params.boardName]
	)

	API.post.requestMany({
		boardName: route.params.boardName,
		count: postsPerPage,
	})

	window.emitter.on("page-end-reached", () => {
		if (route.name !== "feed") {
			return
		}

		API.post.requestMany({
			boardName: route.params.boardName,
			count: postsPerPage,
			page: feedList.value.length / postsPerPage,
		})
	})
</script>

<style>
	#feed {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
