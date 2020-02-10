<template>
	<img :class="{nsfw: file.nsfw}" :width='`${file.thumb.width || 256}px`' :height='`${file.thumb.height || 200}px`' v-lazy='`https://foxtan.tumba.ch/res/thumb/${file.thumb.path}`'>
</template>

<script>
	export default {
		name: 'PostAttachment',
		props: ['file']
	}
</script>

<style>
	img.nsfw {
		filter: url("#sharpBlur");
	}
</style>
