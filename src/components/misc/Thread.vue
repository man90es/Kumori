<template>
	<div>
		<Post :key='post.number' :post='post' v-for='post in thread.posts'/>
	</div>
</template>

<script>
	import Post from './Post.vue'
	
	export default {
		name: 'Thread',
		components: {
			Post
		},
		props: ['thread']
	}
</script>
