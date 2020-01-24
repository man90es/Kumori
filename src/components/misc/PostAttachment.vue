<template>
	<img v-if='file.thumb && !file.nsfw' :width='`${file.thumb.width}px`' :height='`${file.thumb.height}px`' v-lazy='`https://foxtan.tumba.ch/res/thumb/${file.thumb.path}`'>
	<div v-else class='missingThumbnail'>{{file.nsfw ? 'NSFW' : 'Preview unavailable'}}</div>
</template>

<script>
	export default {
		name: 'PostAttachment',
		props: ['file']
	}
</script>

<style scoped>
	.missingThumbnail{
		width: 256px;
		height: 200px;

		justify-content: center;
		align-items: center;
		display: flex;
	}
</style>
