<template>
	<img :class="{nsfw}" :width="API.thumb.width" :height="API.thumb.height" v-lazy="thumbSrc" @click="clickHandler">
</template>

<script setup>
	import { computed } from "vue"
	import API from "../../api"

	const props = defineProps({ file: Object })

	const thumbSrc = computed(() => (
		`${API.thumb.path}${props.file.hash}.${API.thumb.format}`
	))

	const nsfw = computed(() => (
		props.file.modifiers?.includes("NSFW")
	))

	function clickHandler() {
		emitter.emit("post-attachment-preview-click", props.file)
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
