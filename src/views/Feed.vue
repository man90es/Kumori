<template>
	<div id="board">
		<NavBar />
		<MainSection :type="'feed'">
			<Post :key="id" :post="post" v-for="(post, id) in this.$store.state.feed"/>
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
				// this.$store.dispatch('updateFeed', {boardName, count: 10, page: 0})
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
	#board{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
