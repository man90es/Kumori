<template>
	<div id="bookmarks">
		<nav-bar />
		<main-section>
			<post-item :key="postId" :postId="postId" v-for="postId in $store.state.bookmarkedPostsList"/>
		</main-section>
		<menu-bar />
	</div>
</template>

<script setup>
	import MainSection from "../components/layout/MainSection.vue"
	import NavBar from "../components/layout/NavBar.vue"
	import MenuBar from "../components/layout/MenuBar.vue"
	import PostItem from "../components/misc/PostItem.vue"
</script>

<style scoped>
	#bookmarks {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
