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
		data() {
			return {
				postsPerPage: 10
			}
		},
		computed: {
			feedList() {
				return this.$store.state.feedLists[this.$route.params.boardName]
			}
		},
		methods: {
			getFeed(boardName) {
				if (this.feedList == undefined) {
					this.$store.dispatch('requestFeed', {boardName, count: this.postsPerPage, page: 0})
				}
			}
		},
		created() {
			this.getFeed(this.$route.params.boardName)
			emitter.on('page-end-reached', () => {
				if (this.$route.name == 'feed') {
					let page = this.feedList.length / this.postsPerPage
					this.$store.dispatch('requestFeed', {boardName: this.$route.params.boardName, count: this.postsPerPage, page})
				}
			})
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
