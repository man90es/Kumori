<template>
	<ModalShell :header="props.name">
		<div id="media-modal-body">
			<img v-if="!ready" class="icon placeholder" src="@/assets/icons/load.svg" />
			<video v-if="is_video" :src="src" autoplay controls />
			<img v-else :class="{ ready }" :src="src" @load="ready = true" />
		</div>
	</ModalShell>
</template>

<script setup>
	import { ref, computed, inject } from "vue"
	import ModalShell from "@/components/misc/ModalShell"

	const API = inject("API")
	const props = defineProps({
		hash: { type: String, required: true },
		mime: { type: String, required: true },
		name: { type: String, required: true },
	})
	const is_video = computed(() => "video" === props.mime.split("/")[0])
	const ready = ref(is_video.value)

	const src = computed(() => [
		API.res.path,
		props.hash,
		{
			"image/jpeg": ".jpg",
		}[props.mime] || "." + props.mime.split("/")[1],
	].join(""))
</script>

<style scoped lang="scss">
	@keyframes spin {
		0% {
			transform: rotate(0deg) scale(-1, 1)
		}

		100% {
			transform: rotate(360deg) scale(-1, 1)
		}
	}

	#media-modal-body {
		min-width: 10em;
		min-height: 10em;
	}

	.placeholder {
		position: absolute;
		height: 5rem;
		top: calc(50% - 2.5rem);
		left: calc(50% - 2.5rem);
		animation-name: spin;
		animation-duration: 4000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	img {
		max-width: 80vw;
		max-height: 80vh;
		width: auto;
		height: auto;

		&:not(.placeholder):not(.ready) {
			opacity: 0;
	}
}
</style>
