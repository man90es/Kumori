<template>
	<div id="bookmarks">
		<NavBar />
		<MainSection>
			<PostItem :key="postId" :postId="postId" v-for="postId in store.bookmarked" />
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import { onMounted, onUnmounted } from "vue"
	import { usePostMarksStore } from "@/stores/postMarks"
	import API from "@/api"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import PostItem from "@/components/misc/PostItem"

	const store = usePostMarksStore()

	function errorCatcher({ what, error }) {
		return "post" === what?.request && "POST_NOT_FOUND" === error?.message
	}

	onMounted(() => {
		API.addInMessageListener(errorCatcher, msg => store.removeBookmark(msg.what.id))
	})

	onUnmounted(() => {
		API.removeInMessageListener(errorCatcher)
	})
</script>

<style scoped>
	#bookmarks {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
