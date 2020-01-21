<template>
	<div v-if='file.thumb && !file.nsfw' class="thumbnail" :style="`background-image: url(https://foxtan.tumba.ch/res/thumb/${file.thumb.path}); width: ${file.thumb.width}px; height: ${file.thumb.height}px`"></div>
	<div v-else class='missingThumbnail'>
		{{file.nsfw ? 'NSFW' : 'Preview unavailable'}}
	</div>
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
