<template>
	<article v-if='post'>
		{{ post.rawText }}
	</article>
</template>

<script>
	export default {
		name: 'Post',
		props: ['post']
	}
</script>

<style scoped>
	article{
		min-height: 2em;
		background-color: #282c34;
		margin: 0.25rem 0;
	}
</style>
