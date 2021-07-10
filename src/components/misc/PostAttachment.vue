<template>
	<img :class="{nsfw}" :width="width" :height="height" v-lazy="`${meta.thumb}${this.file.hash}.jpg`" @click="clickHandler">
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

<style scoped lang="scss">
	img {
		cursor: pointer;

		&.nsfw {
			filter: url("#sharpBlur");
		}
	}
</style>
