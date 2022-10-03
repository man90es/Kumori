<template>
	<div>
		<img
			:class="{ nsfw: isNSFW }"
			:height="API.thumb.height"
			:src="`${API.thumb.path}${file.hash}.${API.thumb.format}`"
			:width="API.thumb.width"
			@click="clickHandler"
			class="thumbnail"
			loading="lazy"
		/>
		<img
			class="video-marker"
			src="@/assets/icons/play_circle.svg"
			v-if="isVideo"
		/>
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import API from "@/api"

	const props = defineProps({ file: Object })

	const isNSFW = computed(() => props.file.modifiers?.includes("NSFW"))
	const isVideo = computed(() => "video" == props.file.mime.split("/")[0])

	function clickHandler() {
		window.emitter.emit("post-attachment-preview-click", props.file)
	}
</script>

<style scoped lang="scss">
	div {
		position: relative;
	}

	.thumbnail {
		background-color: var(--background-color);
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
