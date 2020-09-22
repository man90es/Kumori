<template>
	<div id="bookmarks">
		<NavBar />
		<MainSection>
			<Post :key="postId" :postId="postId" v-for="postId in $store.state.bookmarkedPostsList"/>
		</MainSection>
		<MenuBar />

		<ModalsLayer />
	</div>
</template>

<script>
	import MainSection from '../components/layout/MainSection.vue'
	import NavBar from '../components/layout/NavBar.vue'
	import MenuBar from '../components/layout/MenuBar.vue'
	import ModalsLayer from '../components/layers/ModalsLayer.vue'
	import Post from '../components/misc/Post.vue'

	export default {
		name: 'Bookmarks',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Post
		}
	}
</script>

<style scoped>
	#bookmarks {
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>