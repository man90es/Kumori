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
	import { usePostMarksStore } from "@/stores/postMarks"
	import MainSection from "@/components/layout/MainSection"
	import MenuBar from "@/components/layout/MenuBar"
	import NavBar from "@/components/layout/NavBar"
	import PostItem from "@/components/misc/PostItem"

	const store = usePostMarksStore()
</script>

<style scoped>
	#bookmarks {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
