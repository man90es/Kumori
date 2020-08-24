<template>
	<div>
		<Post :post='thread.head'/>
		<Post :key="post.id" :post="post" v-for="post in ($store.state.hiddenPosts.includes(thread.head.id) ? [] : $store.state.posts[thread.id] || []).filter(post => post.id != thread.head.id)"/>
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
