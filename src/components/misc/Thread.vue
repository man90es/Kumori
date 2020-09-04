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
				return (this.$store.getters.isHidden(this.thread.head.id) ? [] : this.$store.getters.getThreadReplies(this.thread.id))
			}
		},
		created() {
			requestPosts({threadId: this.thread.id, count: this.pageSize, page: this.tail ? 'tail' : 0})
		}
	}
</script>
