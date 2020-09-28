<template>
	<img :class="{nsfw: file.nsfw}" :width="width" :height="height" v-lazy="`${meta.thumb}${file.thumb.path}`" @click="clickHandler">
</template>

<script>
	import { meta } from '../../api/request.js'

	export default {
		name: 'PostAttachment',
		props: ['file'],
		data() {
			return {
				width: `${this.file.thumb.width || 256}px`,
				height: `${this.file.thumb.height || 200}px`,
				meta: meta
			}
		},
		methods: {
			clickHandler() {
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
