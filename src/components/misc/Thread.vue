<template>
	<div>
		<Post :key='post.number' :post='post' :defaultSubject='defaultSubject' v-for='post in thread.posts'/>
	</div>
</template>

<script>
	import Post from './Post.vue'
	
	export default {
		name: 'Thread',
		components: {
			Post
		},
		props: [
			'thread',
			'defaultSubject'
		]
	}
</script>
