<template>
	<div id="bookmarks">
		<NavBar />
		<MainSection>
			<Post :key="postId" :postId="postId" v-for="postId in $store.state.bookmarkedPostsList"/>
		</MainSection>
		<MenuBar />
	</div>
</template>

<script setup>
	import MainSection from "../components/layout/MainSection.vue"
	import NavBar from "../components/layout/NavBar.vue"
	import MenuBar from "../components/layout/MenuBar.vue"
	import Post from "../components/misc/Post.vue"
</script>

<style scoped>
	#bookmarks {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
