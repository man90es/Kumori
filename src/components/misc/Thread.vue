<template>
	<div>
		<Post :post="thread.head" />
		<Post :key="post.id" :post="post" v-for="post in replies" />
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
			'pageSize',
			'tail'
		],
		computed: {
			replies() {
				let headId = this.thread.head.id
				return (this.$store.state.hiddenPosts.includes(headId) ? [] : this.$store.state.posts[this.thread.id] || []).filter(post => post.id != headId)
			}
		},
		created() {
			requestPosts({threadId: this.thread.id, count: this.pageSize, page: this.tail ? 'tail' : 0})
		}
	}
</script>
