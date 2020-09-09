<template>
	<div id="bookmarks">
		<NavBar />
		<MainSection>
			<Post :key="post.id" :post="post" v-for="post in $store.getters.getBookmarkedPosts"/>
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
	import { requestPost } from '../api'

	export default {
		name: 'Bookmarks',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Post
		},
		methods: {
			getBookmarkedPosts() {
				this.$store.state.bookmarkedPostIds.forEach(requestPost)
			}
		},
		watch: {
			$route(to) {
				this.getBookmarkedPosts()
			}
		},
		created() {
			this.getBookmarkedPosts()
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