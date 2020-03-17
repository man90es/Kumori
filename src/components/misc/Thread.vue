<template>
	<div>
		<Post :post='thread.head'/>
		<!-- TODO: Add replies -->
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
		]
	}
</script>
