<template>
	<div>
		<Post :post='thread.head'/>
		<Post :key="post.id" :post="post" v-for="post in $store.getters.getThreadTail(thread.id, thread.head.id)"/>
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
			const tailSize = 3 // TODO: Make this user-configurable through UI

			tailSize > 0 ? requestPosts({boardName: this.boardName, threadId: this.thread.id, count: tailSize, page: 'tail'}) : null
		}
	}
</script>
