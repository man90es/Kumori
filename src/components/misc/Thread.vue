<template>
	<div>
		<Post :post='thread.head'/>
		<Post :key="post.id" :post="post" v-for="post in filteredPosts"/>
	</div>
</template>

<script>
	import Post from './Post.vue'
	import { requestPosts } from '../../api'
	
	export default {
		name: 'Thread',
		components: {
			Post
		},
		props: [
			'thread',
		],
		created() {
			requestPosts({boardName: this.boardName, threadId: this.thread.id, count: 3, page: 'tail'})
		},
		computed: {
			filteredPosts: function () {
				return this.$store.state.posts.filter((post) => post.threadId == this.thread.id && post.id != this.thread.head.id)
			}
		}
	}
</script>
