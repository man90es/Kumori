<template>
	<img :class="{nsfw: file.nsfw}" :width="width" :height="height" v-lazy="`${meta.thumb}${this.file.hash}.jpg`" @click="clickHandler">
</template>

<script>
	import { meta } from '../../api/request.js'

	export default {
		name: 'PostAttachment',
		props: [
			'file',
		],
		data() {
			return {
				width: `${this.file.thumbWidth || 256}px`,
				height: `${this.file.thumbHeight || 200}px`,
				meta
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
