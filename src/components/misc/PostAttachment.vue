<template>
	<div :class="$style.root">
		<img :class="{ [$style.thumbnail]: true, [$style.blurred]: isNSFW }" :src="thumbSrc" :height="API?.thumb?.height" :width="API?.thumb?.width" @click="handleClick" loading="lazy" />
		<img :class="$style.videoMarker" src="@/assets/icons/play_circle.svg" v-if="isVideo" />
	</div>
</template>

<script setup lang="ts">
	import { computed, inject } from "vue"
	import type { Post } from "@/store"
	import type FKClient from "@bakaso/fkclient"

	const API = inject<FKClient>("API")
	const props = defineProps<{ file: Post["attachments"][number] }>()

	const thumbSrc = computed(() => `${API?.thumb?.path}${props.file.hash}.${API?.thumb?.format}`)
	const isNSFW = computed(() => props.file.modifiers?.includes("NSFW"))
	const isVideo = computed(() => "video" == props.file.mime?.split("/")[0])

	function handleClick() {
		window.emitter.emit("post-attachment-preview-click", props.file)
	}
</script>

<style module>
	.root {
		position: relative;
	}

	.thumbnail {
		background-color: var(--background-color);
		cursor: pointer;
	}

	.blurred {
		filter: url("#sharpBlur");
	}

	.videoMarker {
		filter: invert(1);
		height: 5em;
		left: calc(50% - 2.5em);
		pointer-events: none;
		position: absolute;
		top: calc(50% - 2.5em);
	}
</style>
