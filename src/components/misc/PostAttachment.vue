<template>
	<img :class="{nsfw: file.nsfw}" :width='`${file.thumb.width || 256}px`' :height='`${file.thumb.height || 200}px`' v-lazy='`http://localhost:6749/res/thumb/${file.thumb.path}`' @click="clickHandler">
</template>

<script>
	export default {
		name: 'PostAttachment',
		props: ['file'],
		methods: {
			clickHandler(event) {
				this.$bus.emit('post-attachment-preview-click', this.file)
			}
		}
	}
</script>

<style scoped>
	img {
		cursor: pointer;
	}

	img.nsfw {
		filter: url("#sharpBlur");
	}
</style>
