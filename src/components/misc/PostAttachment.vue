<template>
	<div>
		<img class="thumbnail" :class="{ nsfw: isNSFW }" :width="API.thumb.width" :height="API.thumb.height" v-lazy="thumbSrc" @click="clickHandler">
		<img v-if="isVideo" class="video-marker" src="../../assets/icons/play_circle.svg">
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import API from "../../api"

	const props = defineProps({ file: Object })

	const thumbSrc = computed(() => (
		`${API.thumb.path}${props.file.hash}.${API.thumb.format}`
	))

	const isNSFW = computed(() => (
		props.file.modifiers?.includes("NSFW")
	))

	const isVideo = computed(() => (
		"video" == props.file.mime.split("/")[0]
	))

	function clickHandler() {
		emitter.emit("post-attachment-preview-click", props.file)
	}
</script>

<style scoped lang="scss">
	div {
		position: relative;
	}

	.thumbnail {
		cursor: pointer;

		&.nsfw {
			filter: url("#sharpBlur");
		}
	}

	.video-marker {
		filter: invert(1);
		height: 5em;
		left: calc(50% - 2.5em);
		pointer-events: none;
		position: absolute;
		top: calc(50% - 2.5em);
	}
</style>
