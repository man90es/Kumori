<template>
	<div id="feed">
		<NavBar />
		<MainSection>
			<Post :key="id" :post="post" v-for="(post, id) in $store.state.feed"/>
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
	import { requestPosts } from '../api'

	export default {
		name: 'Feed',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Post
		},
		methods: {
			getFeed(boardName) {
				const postsPerPage = 10 // TODO: Should this be here?
				const currentPage = 0 // TODO: Must be a parameter

				requestPosts({boardName, count: postsPerPage, page: currentPage})
			}
		},
		watch: {
			$route(to) {
				this.getFeed(to.params.boardName)
			}
		},
		created() {
			this.getFeed(this.$route.params.boardName)
		}
	}
</script>

<style>
	#feed{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
