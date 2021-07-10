<template>
	<img :class="{nsfw}" :width="width" :height="height" v-lazy="`${thumbPath}${this.file.hash}.jpg`" @click="clickHandler">
</template>

<script>
	import API from '../../api'

	export default {
		name: 'PostAttachment',
		props: [
			'file',
		],
		data() {
			return {
				width: `${this.file.thumbWidth || 256}px`,
				height: `${this.file.thumbHeight || 200}px`,
				thumbPath: API.thumbPath
			}
		},
		computed: {
			nsfw() {
				return this.file.modifiers && this.file.modifiers.includes('NSFW')
			}
		},
		methods: {
			clickHandler() {
				emitter.emit('post-attachment-preview-click', this.file)
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
