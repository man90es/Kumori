<template>
	<div>
		<Post :post='thread.head'/>
		<Post :key="post.id" :post="post" v-for="post in $store.getters.getThreadPosts(thread.id, thread.head.id)"/>
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
		created() {
			requestPosts({threadId: this.thread.id, count: this.pageSize, page: this.tail ? 'tail' : 0})
		}
	}
</script>
